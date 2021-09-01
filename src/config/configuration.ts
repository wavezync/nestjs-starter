export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  logger: LoggerConfig;
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
  const config: AppConfig = {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      url: process.env.DATABASE_URL,
      poolSize: parseInt(process.env.POOL_SIZE, 10) || 15,
    },
    logger: {
      level: process.env.LOGGER_LEVEL || 'info',
      format: (process.env.LOGGER_FORMAT as LoggerFormat) || LoggerFormat.Json,
    },
  };

  return config;
};
