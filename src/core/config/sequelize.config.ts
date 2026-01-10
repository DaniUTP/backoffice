import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  try {
    const isDevelopment = configService.get('NODE_ENV') === 'development';

  return {
    dialect: 'mysql',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 3306),
    username: configService.get<string>('DB_USERNAME', 'root'),
    password: configService.get<string>('DB_PASSWORD', ''),
    database: configService.get<string>('DB_DATABASE', 'drbank'),
    autoLoadModels: true,
    synchronize: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      evict: 100,
    },
    dialectOptions: {
      ssl: isDevelopment
        ? undefined
        : {
            require: true,
            rejectUnauthorized: false,
          },

      ...(isDevelopment && {
        ssl: false
      })
    },
    logging: isDevelopment ? console.log : false,
  };
  } catch (error) {
    console.error('Error en databaseConfig:', error);
    throw new Error('No se pudo cargar la configuración de la base de datos');
  }
  
};