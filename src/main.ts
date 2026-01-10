import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './core/config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedExceptionFilter } from './core/filters/unauthorized-exception.filter';
import { ValidateTokenGuard } from './core/guard/validate-token.guard';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from './modules/client/repository/client.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new SwaggerConfig(app.get(ConfigService));
  swaggerConfig.setup(app);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.enableCors({
    origin: 'https://admindrbank.startupdev.tech',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  app.useGlobalGuards(new ValidateTokenGuard(app.get(ClientRepository), app.get(JwtService), app.get(ConfigService)));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints
      }));
      return new BadRequestException(result);
    },
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();