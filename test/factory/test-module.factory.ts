import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTestConfig } from '../helpers/test-configuration';
import { TestAppModule } from '../test-app.module';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
export class TestModuleFactory {
  static async createTestModule(): Promise<TestingModule> {
    const postgresContainer = globalThis.__Container__
      .postgres as StartedPostgreSqlContainer;

    // this is to ignore warning from env not found error. does not matter what we put
    process.env.DATABASE_URL = postgresContainer.getConnectionUri();
    process.env.SECRET = 'ASD';
    const testConfig = createTestConfig(
      postgresContainer.getConnectionUri() + '?sslmode=disable',
    );
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [() => testConfig],
          isGlobal: true,
        }),
        TestAppModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          const keys = key.split('.');
          let value = testConfig;
          for (const k of keys) {
            value = value[k];
          }
          return value;
        },
      })
      .compile();

    return moduleRef;
  }
}
