import { User, UserProps } from '@/app/entities/user';
import { faker } from '@faker-js/faker';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  const user = new User({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    ...override,
  });

  user.password = faker.internet.password();

  return user;
}
