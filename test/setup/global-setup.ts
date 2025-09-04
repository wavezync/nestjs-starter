export default async function globalSetup() {
  console.log('🚀 Global Setup: Starting...');

  try {
    // await TestContainerHelper.getInstance().startPostgresContainer();
  } catch (error) {
    console.error('❌ Global Setup: Failed to initialize container:', error);
    throw error;
  }
}
