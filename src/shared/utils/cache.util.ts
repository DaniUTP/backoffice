import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

export interface CacheSetOptions {
    ttl: number;
    maxEntries?: number;
}

export interface CacheEntry<T> {
    value: T;
    expiresAt: number;
    createdAt: number;
    lastAccessed: number;
}

export interface CacheStats {
    totalGroups: number;
    totalEntries: number;
    groups: Record<string, number>;
}
@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(CacheService.name);
    private cache = new Map<string, Map<string, CacheEntry<any>>>();
    private cleanupInterval: NodeJS.Timeout;
    private readonly CLEANUP_INTERVAL = 60000;

    onModuleInit() {
        this.cleanupInterval = setInterval(() => {
            this.cleanupExpiredEntries();
        }, this.CLEANUP_INTERVAL);
        this.logger.log('Cache service initialized');
    }

    onModuleDestroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.logger.log('Cache service destroyed');
    }

    /**
     * Guarda un valor en la cache
     */
    set<T>(
        key: string,
        subKey: string,
        value: T,
        options: CacheSetOptions
    ): boolean {
        try {
            if (!options || typeof options.ttl !== 'number' || options.ttl <= 0) {
                throw new Error('TTL is required and must be a positive number');
            }

            let group: Map<string, CacheEntry<T>>;
            if (!this.cache.has(key)) {
                group = new Map<string, CacheEntry<T>>();
                this.cache.set(key, group);
            } else {
                const existingGroup = this.cache.get(key);
                if (!existingGroup) {
                    group = new Map<string, CacheEntry<T>>();
                    this.cache.set(key, group);
                } else {
                    group = existingGroup;
                }
            }

            const now = Date.now();

            if (options.maxEntries !== undefined && options.maxEntries > 0) {
                if (group.size >= options.maxEntries) {
                    this.removeOldestEntry(key, group);
                }
            }

            const entry: CacheEntry<T> = {
                value,
                expiresAt: now + (options.ttl * 1000),
                createdAt: now,
                lastAccessed: now
            };

            group.set(subKey, entry);

            this.logger.debug(
                `Cache SET: ${key}:${subKey} - TTL: ${options.ttl}s` +
                (options.maxEntries ? `, MaxEntries: ${options.maxEntries}` : '')
            );

            return true;
        } catch (error) {
            this.logger.error(`Error setting cache: ${key}:${subKey}`, error.stack);
            return false;
        }
    }

    /**
     * Obtiene un valor de la cache
     */
    get<T>(key: string, subKey: string): T | null {
        try {
            const group = this.cache.get(key);
            if (!group) {
                return null;
            }

            const entry = group.get(subKey);
            if (!entry) {
                return null;
            }

            const now = Date.now();

            // Verificar si expiró
            if (now > entry.expiresAt) {
                group.delete(subKey);
                this.cleanupEmptyGroup(key);
                return null;
            }

            // Actualizar último acceso
            entry.lastAccessed = now;
            group.set(subKey, entry);

            return entry.value;
        } catch (error) {
            this.logger.error(`Error getting cache: ${key}:${subKey}`, error.stack);
            return null;
        }
    }

    /**
     * Obtiene o establece un valor
     */
    async getOrSet<T>(
        key: string,
        subKey: string,
        fetcher: () => Promise<T>,
        options: CacheSetOptions
    ): Promise<T> {
        const cached = this.get<T>(key, subKey);
        if (cached !== null) {
            return cached;
        }

        const value = await fetcher();
        this.set(key, subKey, value, options);
        return value;
    }

    /**
     * Elimina una entrada específica
     */
    delete(key: string, subKey: string): boolean {
        try {
            const group = this.cache.get(key);
            if (!group) {
                return false;
            }

            const deleted = group.delete(subKey);
            if (deleted) {
                this.cleanupEmptyGroup(key);
                this.logger.debug(`Cache DELETE: ${key}:${subKey}`);
            }

            return deleted;
        } catch (error) {
            this.logger.error(`Error deleting cache: ${key}:${subKey}`, error.stack);
            return false;
        }
    }

    /**
     * Elimina todas las entradas de un grupo
     */
    deleteGroup(key: string): boolean {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.logger.debug(`Cache GROUP DELETE: ${key}`);
        }
        return deleted;
    }

    /**
     * Verifica si existe una entrada
     */
    has(key: string, subKey: string): boolean {
        const group = this.cache.get(key);
        if (!group) {
            return false;
        }

        const entry = group.get(subKey);
        if (!entry) {
            return false;
        }

        const now = Date.now();
        if (now > entry.expiresAt) {
            group.delete(subKey);
            this.cleanupEmptyGroup(key);
            return false;
        }

        return true;
    }

    /**
     * Obtiene todas las claves de un grupo
     */
    getKeys(key: string): string[] {
        const group = this.cache.get(key);
        if (!group) {
            return [];
        }

        const now = Date.now();
        const validKeys: string[] = [];

        for (const [subKey, entry] of group.entries()) {
            if (now > entry.expiresAt) {
                group.delete(subKey);
            } else {
                validKeys.push(subKey);
            }
        }

        this.cleanupEmptyGroup(key);
        return validKeys;
    }

    /**
     * Obtiene todas las entradas de un grupo (nuevo método útil)
     */
    getEntries<T>(key: string): Array<{ subKey: string; value: T; ttl: number }> {
        const group = this.cache.get(key);
        if (!group) {
            return [];
        }

        const now = Date.now();
        const entries: Array<{ subKey: string; value: T; ttl: number }> = [];

        for (const [subKey, entry] of group.entries()) {
            if (now > entry.expiresAt) {
                group.delete(subKey);
            } else {
                entries.push({
                    subKey,
                    value: entry.value,
                    ttl: Math.max(0, Math.floor((entry.expiresAt - now) / 1000))
                });
            }
        }

        this.cleanupEmptyGroup(key);
        return entries;
    }

    /**
     * Limpia toda la cache
     */
    clear(): void {
        const entryCount = this.getStats().totalEntries;
        this.cache.clear();
        this.logger.log(`Cache CLEARED: ${entryCount} entries removed`);
    }

    /**
     * Obtiene estadísticas de la cache
     */
    getStats(): CacheStats {
        const stats: CacheStats = {
            totalGroups: this.cache.size,
            totalEntries: 0,
            groups: {}
        };

        const now = Date.now();

        for (const [key, group] of this.cache.entries()) {
            let validEntries = 0;
            for (const [, entry] of group.entries()) {
                if (now <= entry.expiresAt) {
                    validEntries++;
                }
            }

            stats.groups[key] = validEntries;
            stats.totalEntries += validEntries;
        }

        return stats;
    }

    /**
     * Obtiene información detallada de una entrada
     */
    getEntryInfo(key: string, subKey: string) {
        const group = this.cache.get(key);
        if (!group) {
            return null;
        }

        const entry = group.get(subKey);
        if (!entry) {
            return null;
        }

        const now = Date.now();
        const isExpired = now > entry.expiresAt;

        if (isExpired) {
            group.delete(subKey);
            this.cleanupEmptyGroup(key);
            return null;
        }

        return {
            key,
            subKey,
            value: entry.value,
            ttl: Math.floor((entry.expiresAt - now) / 1000),
            age: Math.floor((now - entry.createdAt) / 1000),
            lastAccessed: Math.floor((now - entry.lastAccessed) / 1000),
            createdAt: new Date(entry.createdAt).toISOString(),
            expiresAt: new Date(entry.expiresAt).toISOString()
        };
    }

    /**
     * Elimina la entrada más antigua de un grupo
     */
    private removeOldestEntry(key: string, group: Map<string, CacheEntry<any>>): void {
        let oldestKey: string | null = null;
        let oldestAccess = Date.now();

        for (const [subKey, entry] of group.entries()) {
            if (entry.lastAccessed < oldestAccess) {
                oldestAccess = entry.lastAccessed;
                oldestKey = subKey;
            }
        }

        if (oldestKey) {
            group.delete(oldestKey);
            this.logger.debug(`Max entries reached for ${key}, removed oldest: ${oldestKey}`);
        }
    }

    /**
     * Limpia entradas expiradas
     */
    private cleanupExpiredEntries(): void {
        const now = Date.now();
        let totalCleaned = 0;

        for (const [key, group] of this.cache.entries()) {
            for (const [subKey, entry] of group.entries()) {
                if (now > entry.expiresAt) {
                    group.delete(subKey);
                    totalCleaned++;
                }
            }
            this.cleanupEmptyGroup(key);
        }

        if (totalCleaned > 0) {
            this.logger.debug(`Cleanup: ${totalCleaned} expired entries removed`);
        }
    }

    /**
     * Elimina grupos vacíos
     */
    private cleanupEmptyGroup(key: string): void {
        const group = this.cache.get(key);
        if (group && group.size === 0) {
            this.cache.delete(key);
        }
    }
}