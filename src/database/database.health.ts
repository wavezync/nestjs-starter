import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { KYSELY_CONNECTION } from './consts';
import { Kysely, sql } from 'kysely';
import { DB } from './schema/db';

const KEY = 'database';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(DatabaseHealthIndicator.name);
  constructor(@Inject(KYSELY_CONNECTION) private db: Kysely<DB>) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await sql`select 1+1 AS result`.execute(this.db);
      return this.getStatus(KEY, true, { status: 'up' });
    } catch (error) {
      this.logger.error('Database connection failed', error);
      throw new HealthCheckError(
        'Database connection failed',
        this.getStatus(KEY, true, { status: 'down' }),
      );
    }
  }
}
