// test/config/test-configuration.ts
import { AppConfig, LoggerFormat } from '../../src/config/configuration';

export const createTestConfig = (databaseUrl: string): AppConfig => ({
  corsMaxAge: 86400,
  database: {
    poolSize: 5,
    url: databaseUrl,
  },
  port: 3000,
  secret: 'kugk2iz30q5mlc6056der8sdnadibb',
  logger: {
    format: LoggerFormat.Json,
    level: 'error',
  },
  isDevEnv: false,
});
