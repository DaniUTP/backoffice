import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export class SwaggerConfig {
  constructor(private readonly configService: ConfigService) { }
  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(this.configService.get<string>('APP_NAME') || 'BackOffice Drbank')
      .setDescription(this.configService.get<string>('APP_DESCRIPTION') || 'Documentación de la API REST BackOffice Drbank')
      .setVersion(this.configService.get<string>('APP_VERSION') || '1.0')
      .addServer(this.configService.get<string>('SWAGGER_SERVER') || 'http://localhost:3000/api/v1')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Introduce el token JWT'
        },
        'JWT-auth'
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.configService.get<string>('SWAGGER_PATH') || '/swagger/drbank', app, document, {
      customSiteTitle: this.configService.get<string>('SWAGGER_CUSTOM') || 'Drbank',
      swaggerOptions: {
        persistAuthorization: true
      }
    });
    app.use(
      '/scalar/drbank',
      apiReference({
        content: document,
      }),
    )
  }
}