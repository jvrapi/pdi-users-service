import { User } from '@/app/entities/user';
import { UserInfoError } from '@/app/errors/user-info-error';
import { UsersRepository } from '@/app/repositories/users-repository';
import { CreateUser } from '@/app/use-cases/create-user';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('Create user use case', () => {
  let usersRepository: UsersRepository;
  let createUser: CreateUser;
  let user: User;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    user = makeUser();
  });

  it('should be able to create a user', async () => {
    const newUser = await createUser.execute({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });
    expect(newUser).toBeTruthy();
  });

  it('should not be able to create a user if e-mail already in use', async () => {
    const newUser = makeUser();

    await usersRepository.create(user);

    await expect(
      createUser.execute({
        email: user.email,
        name: newUser.name,
        password: newUser.password,
        username: newUser.username,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });

  it('should not be able to create a user with invalid username', async () => {
    const newUser = makeUser();

    await usersRepository.create(user);

    await expect(
      createUser.execute({
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        username: user.username,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });
});
