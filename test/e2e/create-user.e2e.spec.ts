import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { makeUser } from '@test/factories/user-factory';
import { User } from '@/app/entities/user';

describe('Create user', () => {
  let app: INestApplication;
  let user: User;
  beforeEach(async () => {
    user = makeUser();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be able to create a user', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });
    expect(response.status).toEqual(201);
  });

  it('should not be able to create a user with invalid email', async () => {
    const newUser = makeUser();

    await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });

    const response = await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      name: newUser.name,
      password: newUser.password,
      username: newUser.username,
    });
    expect(response.status).toEqual(400);
  });

  it('should not be able to create a user with invalid username', async () => {
    const newUser = makeUser();

    await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });

    const response = await request(app.getHttpServer()).post('/users').send({
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
      username: user.username,
    });
    expect(response.status).toEqual(400);
  });
});
