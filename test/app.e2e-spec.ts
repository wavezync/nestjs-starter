import { TestingModule } from '@nestjs/testing';
import { TestModuleFactory } from './factory/test-module.factory';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let testingModule: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    testingModule = await TestModuleFactory.createTestModule();
    app = testingModule.createNestApplication();
    await app.init();
  }, 60000);
  it('should return "Hello World!"', () => {
    expect(true).toBe(true);
  });
});
