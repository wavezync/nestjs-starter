import { UserController } from './modules/user/user.controller';
import { DatabaseModule } from './db/database.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration, {
  LoggerConfig,
  LoggerFormat,
} from './config/configuration';
import { AppConfig } from './config/configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuration],
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
              // and all the others...
            },
          ],
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [Logger],
})
export class AppModule {}
