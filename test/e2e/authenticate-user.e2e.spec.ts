import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { makeUser } from '@test/factories/user-factory';
import { User } from '@/app/entities/user';

describe('Authenticate user', () => {
  let app: INestApplication;
  let user: User;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    user = makeUser();
    await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be able to authenticate user with email', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: user.email,
      password: user.password,
    });

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should be able to authenticate user with username', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: user.username,
      password: user.password,
    });

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should not be able to authenticate a user without username', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: '',
      password: user.password,
    });
    expect(response.status).toEqual(401);
  });

  it('should not be able to authenticate a user without username', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: user.username,
      password: '',
    });
    expect(response.status).toEqual(401);
  });

  it('should not be able to authenticate an invalid user', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: 'tuojzob@owa.nr',
      password: 'HNr6O',
    });

    expect(response.status).toEqual(400);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      username: user.email,
      password: 'wrong-password',
    });

    expect(response.status).toEqual(400);
  });
});
