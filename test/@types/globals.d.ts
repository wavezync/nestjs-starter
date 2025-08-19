import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

declare global {
  // eslint-disable-next-line no-var
  var __TEST__: boolean;
  // eslint-disable-next-line no-var
  var __Container__: {
    postgres: StartedPostgreSqlContainer | null;
  };
}

export {};
