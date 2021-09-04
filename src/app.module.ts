import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration, {
  LoggerConfig,
  LoggerFormat,
} from './config/configuration';
import { AppConfig } from './config/configuration';
import { DomainModule } from './domain/domain.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig>) => {
        const loggerConfig = config.get<LoggerConfig>('logger');

        return {
          pinoHttp: [
            {
              level: loggerConfig.level,
              prettyPrint: loggerConfig.format === LoggerFormat.Pretty,
              formatters: {
                level: (label: string) => {
                  return { level: label };
                },
              },
            },
          ],
        };
      },
    }),
    DatabaseModule,

    // Http modules
    DomainModule,
    HealthModule,
  ],
  providers: [
    Logger,
    // we set all routes to be private by default
    // use `@Public()` to make them public
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
      inject: [DomainModule],
    },
  ],
})
export class AppModule {}
