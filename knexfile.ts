// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
    stub: './src/database/stubs/migration.stub',
  },
};
