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

export class TestContainerHelper {
  private static instance: TestContainerHelper;
  private static container: StartedPostgreSqlContainer;

  private constructor() {}

  public static getInstance(): TestContainerHelper {
    if (!TestContainerHelper.instance) {
      TestContainerHelper.instance = new TestContainerHelper();
    }
    return TestContainerHelper.instance;
  }

  public async startPostgresContainer(): Promise<StartedPostgreSqlContainer> {
    if (!TestContainerHelper.container) {
      TestContainerHelper.container = await new PostgreSqlContainer(
        'postgres:15-alpine',
      ).start();
      console.log('PostgreSQL container started !!!');

      const db = new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: `${TestContainerHelper.container.getConnectionUri()}?sslmode=disable`,
            max: 5,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      });
      await this.runMigrations(db);
      await db.destroy();
    }
    return TestContainerHelper.container;
  }

  public async stopPostgresContainer(): Promise<void> {
    if (TestContainerHelper.container) {
      await TestContainerHelper.container.stop();
      TestContainerHelper.container = undefined;
    }
  }

  private async runMigrations(db: Kysely<DB>): Promise<void> {
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
