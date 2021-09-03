import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const logger = app.get(Logger);

  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const openApiConfig = new DocumentBuilder()
    .setTitle('Syeta Labs NestJS Starter')
    .setDescription('Syeta Labs NestJS Starter')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    logger.log(`Application started at port:${port}`);
  });
}
bootstrap();
