import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestContainerHelper } from '../helpers/test-container.helper';

globalThis.__TEST__ = true;
globalThis.__Container__ = {
  postgres: null as StartedPostgreSqlContainer | null,
};

export default async function globalSetup() {
  console.log('🚀 Global Setup: Starting...');

  try {
    const postgresContainer =
      await TestContainerHelper.getInstance().startPostgresContainer();
    globalThis.__Container__.postgres = postgresContainer;
  } catch (error) {
    console.error('❌ Global Setup: Failed to initialize container:', error);
    throw error;
  }
}
