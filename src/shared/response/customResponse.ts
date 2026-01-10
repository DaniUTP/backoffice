import { HttpStatus, Logger } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { I18nContext } from 'nestjs-i18n';
import { ResponseApi } from './responseApi';
import { ConfigService } from '@nestjs/config';
import { ConstantsUtil } from '../utils/constants.util';

export class CustomResponse {
    private readonly logger = new Logger(CustomResponse.name);
    private readonly configService: ConfigService | null;
    constructor(configService?: ConfigService) {
        this.configService = configService || null;
    }
    getLanguage(language: string) {
        let supportedLanguages: string[] = ['es'];
        try {
            const languagesPath = path.join(process.cwd(), 'dist', 'core', 'i18n', 'language.json');

            if (fs.existsSync(languagesPath)) {
                const fileContent = fs.readFileSync(languagesPath, 'utf-8');
                const languagesData = JSON.parse(fileContent);
                supportedLanguages = Object.keys(languagesData);
            } else {
                console.warn('Archivo languages.json no encontrado en:', languagesPath);
            }
        } catch (error) {
            this.logger.log('Error al cargar languages.json:', error.message);
        }
        if (!supportedLanguages.includes(language)) {
            language = 'es';
        }
        return language;
    }
    responseValidation(message: string, field: string, lang: string) {
        try {
            const language = this.getLanguage(lang);
            const i18n = I18nContext.current();
            const dynamicValue = ConstantsUtil.getConstraintValue(field, message);
            console.log("Valor del dynamic:", dynamicValue)
            return i18n?.t('messages.' + message, {
                args: {
                    constraint: dynamicValue
                },
                lang: language
            });
        } catch (error) {
            this.logger.log('Error al generar el mensaje de validación: ', error.message);
        }
    }
    message(message: string, lang: string): string {
        try {
            if (!message) {
                this.logger.warn('Parámetros inválidos para mensaje', { message, lang });
                return 'Error: Parámetros inválidos';
            }

            const language = this.getLanguage(lang);
            const i18n = I18nContext.current();

            if (!i18n) {
                this.logger.error('Contexto i18n no disponible');
                return 'Error: Contexto de internacionalización no disponible';
            }

            const messageTranslate: string = i18n.t('messages.' + message, {
                lang: language
            });

            console.log("message translate: ", messageTranslate);
            return messageTranslate;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            this.logger.error('Error al generar el mensaje de respuesta: ', errorMessage);
            return 'Error';
        }
    }
    responseMessage(message: string, lang: string, status: number): ResponseApi {
        try {
            const language = this.getLanguage(lang);
            const i18n = I18nContext.current();
            const messageTranslate = i18n?.t('messages.' + message, {
                lang: language
            });
            console.log("message translate: ", messageTranslate);
            return {
                response: { message: messageTranslate },
                statusCode: status
            };
        } catch (error) {
            this.logger.log('Error al generar el mensaje de respuesta: ', error.message);
            return {
                response: { message: 'Error interno del servidor' },
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            };
        }
    };
    responseBody(body: Object, status: number): ResponseApi {
        return {
            response: body,
            statusCode: status
        };
    };
    translateMessages(message: string, lang: string) {
        const language = this.getLanguage(lang);
        const i18n = I18nContext.current();
        return i18n?.t('messages.' + message, {
            lang: language
        });
    };
}
