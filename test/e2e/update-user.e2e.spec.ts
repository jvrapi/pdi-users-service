import { User } from '@/app/entities/user';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeUser } from '@test/factories/user-factory';
import request from 'supertest';

describe('Update user', () => {
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

  it('should be able to update a user', async () => {
    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      username: user.email,
      password: user.password,
    });
    const token = authResponse.body.token;
    const updateUserResponse = await request(app.getHttpServer())
      .put('/users')
      .send({
        name: 'Tommy Klein',
        email: 'zelu@if.id',
        username: 'YJeyhQXRVy',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(updateUserResponse.status).toEqual(200);
  });

  it('should not be able to update a user if new e-email already in use', async () => {
    const secondUser = makeUser();

    await request(app.getHttpServer()).post('/users').send({
      email: secondUser.email,
      name: secondUser.name,
      password: secondUser.password,
      username: secondUser.username,
    });
    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      username: secondUser.email,
      password: secondUser.password,
    });

    const token = authResponse.body.token;

    const updateUserResponse = await request(app.getHttpServer())
      .put('/users')
      .send({
        email: user.email,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(updateUserResponse.status).toEqual(400);
  });

  it('should not be able to update a user if new username already in use', async () => {
    const secondUser = makeUser();

    await request(app.getHttpServer()).post('/users').send({
      email: secondUser.email,
      name: secondUser.name,
      password: secondUser.password,
      username: secondUser.username,
    });

    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      username: secondUser.email,
      password: secondUser.password,
    });

    const token = authResponse.body.token;

    const updateUserResponse = await request(app.getHttpServer())
      .put('/users')
      .send({
        username: user.username,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(updateUserResponse.status).toEqual(400);
  });
});
