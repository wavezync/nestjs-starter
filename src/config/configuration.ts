// Define the app config here

import { cleanEnv, num, str } from 'envalid';

// You can inject it to anywhere via ConfigService
export interface AppConfig {
  port: number;
  secret: string;
  database: DatabaseConfig;
  logger: LoggerConfig;
  isDevEnv: boolean;
}

export interface DatabaseConfig {
  url: string;
  poolSize: number;
}

export enum LoggerFormat {
  Json = 'json',
  Pretty = 'pretty',
}

export interface LoggerConfig {
  level: string;
  format: LoggerFormat;
}

export default (): AppConfig => {
  // validate env vars
  const env = cleanEnv(process.env, {
    SECRET: str(),
    PORT: num({ default: 3000 }),
    DATABASE_URL: str(),
    POOL_SIZE: num({ default: 15 }),
    LOGGER_LEVEL: str({
      choices: ['info', 'debug', 'error', 'warn'],
      default: 'info',
    }),
    LOGGER_FORMAT: str({ choices: ['json', 'pretty'], default: 'json' }),
  });

  const config: AppConfig = {
    port: env.PORT,
    secret: env.SECRET,
    database: {
      url: env.DATABASE_URL,
      poolSize: env.POOL_SIZE || 15,
    },
    logger: {
      level: env.LOGGER_LEVEL || 'info',
      format: (env.LOGGER_FORMAT as LoggerFormat) || LoggerFormat.Json,
    },
    isDevEnv: env.isDev,
  };

  return config;
};
