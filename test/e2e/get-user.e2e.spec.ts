import { User } from '@/app/entities/user';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeUser } from '@test/factories/user-factory';
import { randomUUID } from 'crypto';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

jest.setTimeout(500000);

describe('Get user', () => {
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

  it('should be able to get a user', async () => {
    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      username: user.email,
      password: user.password,
    });

    const getUserResponse = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${authResponse.body.token}`);

    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body).toBeTruthy();
    expect(getUserResponse.body.email).toEqual(user.email);
  });

  it('should not be able to get a user', async () => {
    const getUserResponse = await request(app.getHttpServer()).get('/users/me');

    expect(getUserResponse.status).toEqual(401);
  });

  it('should be able to get an not found status with an invalid token', async () => {
    const invalidToken = sign({}, process.env.JWT_PRIVATE_KEY, {
      subject: randomUUID(),
      algorithm: 'RS256',
    });

    const getUserResponse = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(getUserResponse.status).toEqual(404);
  });
});
