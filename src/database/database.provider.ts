import { KNEX_CONNECTION } from './consts';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from 'src/config/configuration';
import { knex } from 'knex';
import { Model } from 'objection';

export const databaseProviders = [
  {
    provide: KNEX_CONNECTION,
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

      const knexConn = knex({
        client: 'pg',
        connection: {
          connectionString: database.url,
          ssl: sslConfig,
        },
        pool: { min: 0, max: database.poolSize },
        debug: isDevEnv,
      });

      // now every model has this knex instance
      // we dont need to DI or anything to setup the model with objection
      Model.knex(knexConn);

      return knexConn;
    },
  },
];
