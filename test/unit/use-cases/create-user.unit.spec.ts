import { CreateUser } from '@/app/use-cases/create-user';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('Create user use case', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const userData = makeUser();
    userData.password = 'zl5cs0';
    const user = await createUser.execute(userData);
    expect(user).toBeTruthy();
  });

  it('should not be able to create a user with invalid email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const firstUser = makeUser();
    firstUser.password = 'zl5cs0';
    const secondUser = makeUser({
      ...firstUser,
    });

    await usersRepository.create(firstUser);

    await expect(createUser.execute(secondUser)).rejects.toThrowError();
  });

  it('should not be able to create a user with invalid username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const firstUser = makeUser();
    firstUser.password = 'zl5cs0';
    const secondUser = makeUser({
      ...firstUser,
      email: 'fe@avo.ge',
    });

    await usersRepository.create(firstUser);

    await expect(createUser.execute(secondUser)).rejects.toThrowError();
  });
});
