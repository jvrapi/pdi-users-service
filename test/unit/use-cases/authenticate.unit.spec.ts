import { Authenticate } from '@/app/use-cases/authenticate';
import { CreateUser } from '@/app/use-cases/create-user';
import { AuthenticationError } from '@/app/use-cases/errors/authentication-error';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('Authenticate user use case', () => {
  it('should be able to authenticate a user with email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    const createUserUseCase = new CreateUser(usersRepository);
    const userData = makeUser();
    userData.password = 'rNTsW';
    await createUserUseCase.execute(userData);
    const token = await authenticateUseCase.execute({
      password: userData.password,
      username: userData.email,
    });

    expect(token).toBeTruthy();
  });

  it('should be able to authenticate a user with username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    const createUserUseCase = new CreateUser(usersRepository);
    const userData = makeUser();
    userData.password = 'rNTsW';
    await createUserUseCase.execute(userData);
    const token = await authenticateUseCase.execute({
      password: userData.password,
      username: userData.username,
    });

    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate a user without username or password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    const credentials = ['username', 'password'];
    const username = ['username', 'email'];
    const selectedFieldIndex = Math.floor(Math.random() * credentials.length);
    const selectedUsernameIndex = Math.floor(
      Math.random() * credentials.length,
    );
    const userData = makeUser();
    userData.password = 'rNTsW';
    userData[credentials[selectedFieldIndex]] = null;
    await expect(
      authenticateUseCase.execute({
        username: username[username[selectedUsernameIndex]],
        password: userData.password,
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });

  it('should not be able to authenticate an invalid user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    await expect(
      authenticateUseCase.execute({
        username: 'tuojzob@owa.nr',
        password: 'HNr6O',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    const createUserUseCase = new CreateUser(usersRepository);
    const userData = makeUser();
    userData.password = 'rNTsW';
    await createUserUseCase.execute(userData);

    await expect(
      authenticateUseCase.execute({
        username: userData.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });
});
