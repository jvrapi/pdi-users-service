import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { makeUser } from '@test/factories/user-factory';

describe('Create user', () => {
  let app: INestApplication;
  beforeEach(async () => {
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
    const userData = makeUser();
    userData.password = 'zl5cs0';
    const response = await request(app.getHttpServer()).post('/users').send({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      username: userData.username,
    });
    expect(response.status).toEqual(201);
  });

  it('should not be able to create a user with invalid email', async () => {
    const firstUser = makeUser();

    firstUser.password = 'zl5cs0';

    const secondUser = makeUser({
      ...firstUser,
    });

    await request(app.getHttpServer()).post('/users').send({
      email: firstUser.email,
      name: firstUser.name,
      password: firstUser.password,
      username: firstUser.username,
    });

    const response = await request(app.getHttpServer()).post('/users').send({
      email: secondUser.email,
      name: secondUser.name,
      password: secondUser.password,
      username: secondUser.username,
    });
    expect(response.status).toEqual(400);
  });

  it('should not be able to create a user with invalid username', async () => {
    const firstUser = makeUser();
    firstUser.password = 'zl5cs0';
    const secondUser = makeUser({
      ...firstUser,
      email: 'fe@avo.ge',
    });

    await request(app.getHttpServer()).post('/users').send({
      email: firstUser.email,
      name: firstUser.name,
      password: firstUser.password,
      username: firstUser.username,
    });

    const response = await request(app.getHttpServer()).post('/users').send({
      email: secondUser.email,
      name: secondUser.name,
      password: secondUser.password,
      username: secondUser.username,
    });
    expect(response.status).toEqual(400);
  });
});
