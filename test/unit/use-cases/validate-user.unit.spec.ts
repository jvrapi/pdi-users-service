import { User } from '@/app/entities/user';
import { AuthenticationError } from '@/app/errors/authentication-error';
import { UsersRepository } from '@/app/repositories/users-repository';
import { CreateUser } from '@/app/use-cases/create-user';
import { ValidateUser } from '@/app/use-cases/validate-user';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('Validate user use case', () => {
  let usersRepository: UsersRepository;
  let validateUser: ValidateUser;
  let user: User;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    validateUser = new ValidateUser(usersRepository);
    const createUser = new CreateUser(usersRepository);
    user = makeUser();
    user.password = 'RvUfT';

    await createUser.execute({
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });
  });

  it('should be able to validate user with email', async () => {
    const userValidated = await validateUser.execute({
      username: user.email,
      password: user.password,
    });

    expect(userValidated).toBeTruthy();
  });

  it('should be able to validate user with username', async () => {
    const userValidated = await validateUser.execute({
      username: user.username,
      password: user.password,
    });
    expect(userValidated).toBeTruthy();
  });

  it('should not be able to validate a user without username or password', async () => {
    const credentials = ['username', 'email', 'password'];
    const selectedFieldToNull =
      credentials[Math.floor(Math.random() * credentials.length)];

    const usernameFields = credentials.filter(
      (credential) => credential !== 'password',
    );
    const usernameField =
      usernameFields[Math.floor(Math.random() * usernameFields.length)];

    user[selectedFieldToNull] = null;

    await expect(
      validateUser.execute({
        username: user[usernameField],
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });

  it('should not be able to validate an invalid user', async () => {
    await expect(
      validateUser.execute({
        username: 'tuojzob@owa.nr',
        password: 'HNr6O',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });

  it('should not be able to validate user with invalid password', async () => {
    await expect(
      validateUser.execute({
        username: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError);
  });
});
