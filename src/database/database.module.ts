import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseHealthIndicator } from './database.health';
import { databaseProviders } from './database.provider';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, DatabaseHealthIndicator, DatabaseService],
  exports: [...databaseProviders, DatabaseHealthIndicator, DatabaseService],
})
export class DatabaseModule {}
