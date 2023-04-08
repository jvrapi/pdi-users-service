import { UserInfoError } from '@/app/errors/user-info-error';
import { UpdateUser } from '@/app/use-cases/update-user';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { randomUUID } from 'node:crypto';

describe('Update user use case', () => {
  it('should be able to update a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUser = new UpdateUser(usersRepository);
    const userData = makeUser();
    userData.password = 'zl5cs0';
    await usersRepository.create(userData);
    const user = await updateUser.execute(userData);
    expect(user).toBeTruthy();
  });

  it('should not be able to create a user with invalid email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUser = new UpdateUser(usersRepository);

    const firstUser = makeUser();

    await usersRepository.create(firstUser);

    const secondUser = makeUser({
      email: 'sepju@basuz.jm',
    });

    await usersRepository.create(secondUser);

    await expect(
      updateUser.execute({
        id: firstUser.id,
        name: firstUser.name,
        username: firstUser.username,
        email: secondUser.email,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });

  it('should not be able to create a user with invalid username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUser = new UpdateUser(usersRepository);

    const firstUser = makeUser();

    await usersRepository.create(firstUser);

    const secondUser = makeUser({
      email: 'sepju@basuz.jm',
      username: '8fLhxeHc',
    });

    await usersRepository.create(secondUser);

    await expect(
      updateUser.execute({
        id: firstUser.id,
        name: firstUser.name,
        email: firstUser.email,
        username: secondUser.username,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });

  it('should not be able to update a invalid user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUser = new UpdateUser(usersRepository);
    await expect(
      updateUser.execute({
        email: 'depinoj@setjewe.cr',
        id: randomUUID(),
        name: 'Bobby Fuller',
        username: 'l0Gu9',
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });
});
