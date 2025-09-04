import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { JwtGuard } from 'common/guards';
import { AppConfig, LoggerConfig, LoggerFormat } from 'config/configuration';
import { DatabaseModule } from 'database/database.module';
import { AuthModule } from 'modules/auth/auth.module';
import { HealthModule } from 'modules/health/health.module';
import { UserModule } from 'modules/user/user.module';
import { Logger, LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'test',
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig>) => {
        const loggerConfig = config.get<LoggerConfig>('logger');

        return {
          pinoHttp: {
            level: loggerConfig.level,
            transport:
              loggerConfig.format === LoggerFormat.Pretty
                ? { target: 'pino-pretty' }
                : undefined,
            useLevelLabels: true,
            formatters: {
              level: (label: string) => {
                return { level: label };
              },
            },
            autoLogging: false,
          },
        };
      },
    }),
    DatabaseModule,

    // Http modules
    AuthModule,
    UserModule,
    HealthModule,
  ],
  providers: [
    Logger,
    // we set all routes to be private by default
    // use `@Public()` to make them public
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class TestAppModule {}
