import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseHealthIndicator } from './database.health';
import { databaseProviders } from './database.provider';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, DatabaseHealthIndicator],
  exports: [...databaseProviders, DatabaseHealthIndicator],
})
export class DatabaseModule {}
