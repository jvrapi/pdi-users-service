import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { makeUser } from '@test/factories/user-factory';

describe('Authenticate user', () => {
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

  it('should be able to authenticate user with email', async () => {
    const userData = makeUser();
    userData.password = 'zl5cs0';
    await request(app.getHttpServer()).post('/users').send({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      username: userData.username,
    });

    const response = await request(app.getHttpServer()).post('/auth').send({
      username: userData.email,
      password: userData.password,
    });

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should be able to authenticate user with username', async () => {
    const userData = makeUser();
    userData.password = 'zl5cs0';
    await request(app.getHttpServer()).post('/users').send({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      username: userData.username,
    });

    const response = await request(app.getHttpServer()).post('/auth').send({
      username: userData.username,
      password: userData.password,
    });

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should not be able to authenticate a user without username or password', async () => {
    const credentials = ['username', 'password'];
    const username = ['username', 'email'];
    const selectedFieldIndex = Math.floor(Math.random() * credentials.length);
    const selectedUsernameIndex = Math.floor(
      Math.random() * credentials.length,
    );
    const userData = makeUser();
    userData.password = 'rNTsW';

    userData[credentials[selectedFieldIndex]] = null;

    const response = await request(app.getHttpServer()).post('/auth').send({
      username: username[username[selectedUsernameIndex]],
      password: userData.password,
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
    const userData = makeUser();
    userData.password = 'zl5cs0';
    await request(app.getHttpServer()).post('/users').send({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      username: userData.username,
    });

    const response = await request(app.getHttpServer()).post('/auth').send({
      username: userData.email,
      password: 'wrong-password',
    });

    expect(response.status).toEqual(400);
  });
});
