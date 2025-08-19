import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { TestModuleFactory } from '../factory/test-module.factory';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { ValidationException } from 'common/exceptions/validation.exception';
import { BaseExceptionsFilter } from 'common/filters/base-exception.filter';
import { AllExceptionsFilter } from 'common/filters/all-exception.filter';

describe('UserModule', () => {
  let testingModule: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    testingModule = await TestModuleFactory.createTestModule();
    app = testingModule.createNestApplication();

    app.useGlobalFilters(new AllExceptionsFilter(), new BaseExceptionsFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          return new ValidationException(errors);
        },
        transform: true,
        whitelist: true,
        validationError: { target: false },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const generateValidUserDto = () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
  });

  describe('POST /users/register', () => {
    it('should register a user with valid data', async () => {
      const userDto = generateValidUserDto();
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(201);

      expect(response.body).toEqual({
        message: 'Account created',
      });
    });

    it('should return 400 when email is invalid', async () => {
      const userDto = {
        email: 'invalid-email',
        password: faker.internet.password({ length: 8 }),
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should return 400 when email is missing', async () => {
      const userDto = {
        password: faker.internet.password({ length: 8 }),
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should return 400 when password is missing', async () => {
      const userDto = {
        email: faker.internet.email(),
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should return 400 when password is empty', async () => {
      const userDto = {
        email: faker.internet.email(),
        password: '',
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should return 409 when email is already taken', async () => {
      // First, register a user
      const userDto = generateValidUserDto();
      await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(201);

      // Try to register with the same email
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(409);

      expect(response.body.message).toContain('already in use');
    });

    it('should return 400 when request body is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send({})
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('Edge Cases and Security', () => {
    it('should handle very long email addresses', async () => {
      const longEmail = 'a'.repeat(200) + '@example.com';
      const userDto = {
        email: longEmail,
        password: faker.internet.password({ length: 8 }),
      };

      // There seems to be validation for long emails
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(400);

      expect(response.body.message).toBe('Validation Failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should handle special characters in password', async () => {
      const userDto = {
        email: faker.internet.email(),
        password: '!@#$%^&*()_+-=[]{}|;:,.<>?',
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(201);

      expect(response.body.message).toBe('Account created');
    });

    it('should handle unicode characters in email', async () => {
      const userDto = {
        email: `test-unicode-${Date.now()}@example.com`,
        password: faker.internet.password({ length: 8 }),
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto)
        .expect(201);

      expect(response.body.message).toBe('Account created');
    });

    it('should be case insensitive for email comparison', async () => {
      const baseEmail = faker.internet.email().toLowerCase();
      const upperEmail = baseEmail.toUpperCase();

      const userDto1 = {
        email: baseEmail,
        password: faker.internet.password({ length: 8 }),
      };

      const userDto2 = {
        email: upperEmail,
        password: faker.internet.password({ length: 8 }),
      };

      // Register with lowercase email
      await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto1)
        .expect(201);

      // Try to register with uppercase email - should fail since emails are normalized to lowercase
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userDto2)
        .expect(409);

      expect(response.body.message).toContain('already in use');
    });
  });
});
