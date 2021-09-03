/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './models/user.model';
import { AppConfig, DatabaseConfig } from '../config/configuration';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(appConfig: ConfigService<AppConfig>) {
        const isDevEnv = appConfig.get<boolean>('isDevEnv');
        const database = appConfig.get<DatabaseConfig>('database');

        const sslConfig = isDevEnv
          ? undefined
          : {
              rejectUnauthorized: false,
            };

        return {
          config: {
            client: 'pg',
            connection: {
              connectionString: database.url,
              ssl: sslConfig,
            },
            pool: { min: 0, max: 15 },
            debug: isDevEnv,
          },
        };
      },
    }),
    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([User]),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
