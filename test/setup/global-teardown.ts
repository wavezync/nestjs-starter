import { PostgresContainer } from '../utils/postgres-container';

export default async function globalTeardown() {
  console.log('🚀 Global Teardown: Stopping...');
  await PostgresContainer.stop();
}
