import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './core/config/sequelize.config';
import { ClientModule } from './modules/client/module/client.module';
import { I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AuthModule } from './modules/auth/module/auth.module';
import { AreaModule } from './modules/area/module/area.module';
import * as path from 'node:path';
import { SpecialtyModule } from './modules/specialty/module/specialty.module';
import { ThemeModule } from './modules/theme/module/theme.module';
import { ExamTypeModule } from './modules/examType/module/exam-type.module';
import { QuestionModule } from './modules/question/module/question.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from './core/guard/ratelimit.guard';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [dotenv.config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: Number.parseInt(config.get<string>('JWT_EXPIRES_IN', '5h')),
        },
      }),
      global: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, 'core/i18n'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang'])
      ]
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
    }),
    ClientModule,
    AuthModule,
    AreaModule,
    SpecialtyModule,
    ThemeModule,
    ExamTypeModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard
    },
  ],
})
export class AppModule { }
