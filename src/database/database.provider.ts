import { KYSELY_CONNECTION } from './consts';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from '../config/configuration';
import { Pool } from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { DB } from './schema/db';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: KYSELY_CONNECTION,
    inject: [ConfigService],
    useFactory: (appConfig: ConfigService<AppConfig>) => {
      const isDevEnv = appConfig.get<boolean>('isDevEnv');
      const database = appConfig.get<DatabaseConfig>('database');

      // to work with heroku
      const sslConfig = isDevEnv
        ? undefined
        : {
            rejectUnauthorized: false,
          };

      // creates a Kysely connection

      const db = new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: database.url,
            max: database.poolSize,
            ssl: sslConfig,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      });

      return db;
    },
  },
];
