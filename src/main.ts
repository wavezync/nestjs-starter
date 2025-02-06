import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { BaseExceptionsFilter } from './common/filters/base-exception.filter';
import { ValidationException } from './common/exceptions/validation.exception';
import { AllExceptionsFilter } from 'common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const logger = app.get(Logger);

  const helmetContentSecurityPolicy = {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [
        `'self'`,
        `'unsafe-inline'`,
        'unpkg.com',
        'cdn.jsdelivr.net',
        'fonts.googleapis.com',
      ],
      connectSrc: [`'self'`, `unpkg.com`],
      fontSrc: [`'self'`, 'fonts.gstatic.com'],
      imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
      scriptSrc: [
        `'self'`,
        `'unsafe-eval'`,
        `https: 'unsafe-inline'`,
        `cdn.jsdelivr.net`,
        `unpkg.com`,
      ],
    },
  };

  app.useLogger(app.get(Logger));
  app.use(
    helmet({
      contentSecurityPolicy: helmetContentSecurityPolicy,
    }),
  );
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new AllExceptionsFilter(), new BaseExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
      transform: true,
      whitelist: true,
      validationError: { target: false },
    }),
  );

  app.setGlobalPrefix('api');

  const openApiConfig = new DocumentBuilder()
    .setTitle('WaveZync NestJS starter')
    .setDescription('WaveZync NestJS starter')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local')
    .setExternalDoc(
      'For Validation Errors please check class-validator',
      'https://github.com/typestack/class-validator#validation-errors',
    )
    .addBearerAuth()
    .addGlobalParameters({
      in: 'path',
      name: 'X-Api-Version',
      required: false,
      description: 'API Version',
    })
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    logger.log(`Application started at port:${port}`);
  });
}
bootstrap();
