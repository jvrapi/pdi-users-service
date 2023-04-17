import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeUser } from '@test/factories/user-factory';
import request from 'supertest';

describe('Get user', () => {
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

  it('should be able to update a user', async () => {
    const userData = makeUser();
    userData.password = 'zl5cs0';
    await request(app.getHttpServer()).post('/users').send({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      username: userData.username,
    });
    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      username: userData.email,
      password: userData.password,
    });

    const getUserResponse = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${authResponse.body.token}`);

    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body).toBeTruthy();
    expect(getUserResponse.body.email).toEqual(userData.email);
  });
});
