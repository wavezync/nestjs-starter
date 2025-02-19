import { Kysely, sql } from 'kysely';
import { DB } from '../schema/db';

const tableName = 'users';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable(tableName)
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('password_hash', 'text')
    .addColumn('verified', 'boolean', (col) => col.defaultTo(false))
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
