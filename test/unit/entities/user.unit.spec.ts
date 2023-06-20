import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { User } from '@/app/entities/user';

describe('User entity', () => {
  it('should be able to create a instance of user', () => {
    const user = new User(
      {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      randomUUID(),
    );

    user.password = faker.internet.password();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();

    expect(typeof user.id).toBe('string');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
    expect(typeof user.username).toBe('string');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
