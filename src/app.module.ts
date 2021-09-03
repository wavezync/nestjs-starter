import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration, {
  LoggerConfig,
  LoggerFormat,
} from './config/configuration';
import { AppConfig } from './config/configuration';
import { TerminusModule } from '@nestjs/terminus';

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
    HealthModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
