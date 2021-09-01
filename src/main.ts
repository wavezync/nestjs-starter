import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AppConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config: AppConfig = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const openApiConfig = new DocumentBuilder()
    .setTitle('WinMe Life API')
    .setDescription('WinMe Life API')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api', 'Local')
    .addServer('https://winmelife-api.herokuapp.com/api', 'Heroku')
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(config.port);
}
bootstrap();
