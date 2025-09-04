import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { DB } from 'database/schema/db';
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import { join } from 'path';
import { promises as fs } from 'fs';
import * as path from 'path';

import { Pool } from 'pg';
/**
 * This class manages a PostgreSQL container for testing purposes.
 * It ensures that the container is started only once and provides methods
 * to run migrations and stop the container.
 */
export class PostgresContainer {
  private static instance: StartedPostgreSqlContainer | null = null;

  static async getInstance(): Promise<StartedPostgreSqlContainer> {
    if (!PostgresContainer.instance) {
      const container = await new PostgreSqlContainer(
        'postgres:15-alpine',
      ).start();
      PostgresContainer.instance = container;

      const db = new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: `${container.getConnectionUri()}?sslmode=disable`,
            max: 5,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      });
      await this.runMigrations(db);
      await db.destroy();
    }
    return PostgresContainer.instance;
  }

  static async stop(): Promise<void> {
    if (PostgresContainer.instance) {
      await PostgresContainer.instance.stop();
      PostgresContainer.instance = null;
    }
  }

  static async runMigrations(db: Kysely<DB>): Promise<void> {
    console.log('Running migrations...');

    const migrationsPath = join(__dirname, '../../src/database/migrations');

    try {
      await fs.access(migrationsPath);

      const migrator = new Migrator({
        db: db,
        provider: new FileMigrationProvider({
          fs,
          path,
          migrationFolder: migrationsPath,
        }),
        allowUnorderedMigrations: true,
      });

      const { error, results } = await migrator.migrateToLatest();

      results?.forEach((it) => {
        if (it.status === 'Success') {
          console.log(
            `Migration "${it.migrationName}" was executed successfully`,
          );
        } else if (it.status === 'Error') {
          console.error(`Failed to execute migration "${it.migrationName}"`);
        }
      });

      if (error) {
        console.error('Failed to migrate:', error);
        throw error;
      }

      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Migration error:', error);
      throw error;
    }
  }
}
