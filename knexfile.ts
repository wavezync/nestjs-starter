// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: require('find-config')('.env') });

const isProd =
  process.env.NODE_CONFIG_ENV === 'production' ||
  process.env.NODE_CONFIG_ENV === 'staging' ||
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging';

const extension = isProd ? 'js' : 'ts';

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './src/database/migrations',
    extension: extension,
    loadExtensions: [`.${extension}`],
    stub: './src/database/stubs/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    extension: extension,
    loadExtensions: [`.${extension}`],
  },
};
