import { Inject, Injectable } from '@nestjs/common';
import { KYSELY_CONNECTION } from './consts';
import { Kysely } from 'kysely';
import { DB } from './schema/db';

@Injectable()
export class DatabaseService {
  constructor(@Inject(KYSELY_CONNECTION) private db: Kysely<DB>) {}

  getDB(): Kysely<DB> {
    return this.db;
  }
}
