import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTestConfig } from '../helpers/test-configuration';
import { TestAppModule } from '../test-app.module';
export class TestModuleFactory {
  static async createTestModule(dbUrl: string): Promise<TestingModule> {
    const databaseUrl = dbUrl + '?sslmode=disable';
    // this is to ignore warning from env not found error. does not matter what we put
    process.env.DATABASE_URL = databaseUrl;
    process.env.SECRET = 'fqipdmzavlbb9cvbzpab2fw5h5j4tu';
    const testConfig = createTestConfig(databaseUrl);
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
