import { User } from '@/app/entities/user';
import { UserInfoError } from '@/app/errors/user-info-error';
import { UsersRepository } from '@/app/repositories/users-repository';
import { UpdateUser } from '@/app/use-cases/update-user';
import { faker } from '@faker-js/faker';

import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { randomUUID } from 'node:crypto';

describe('Update user use case', () => {
  let usersRepository: UsersRepository;
  let updateUser: UpdateUser;
  let user: User;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    updateUser = new UpdateUser(usersRepository);
    user = makeUser();
    usersRepository.create(user);
  });
  it('should be able to update a user', async () => {
    const newName = faker.name.fullName();
    const userUpdated = await updateUser.execute({
      name: newName,
      email: '',
      id: user.id,
      username: '',
    });
    expect(userUpdated).toBeTruthy();
    expect(userUpdated.email).toEqual(user.email);
    expect(userUpdated.username).toEqual(user.username);
    expect(userUpdated.id).toEqual(user.id);
  });

  it('should not be able to create a user if new already in use', async () => {
    const secondUser = makeUser();

    await usersRepository.create(secondUser);

    await expect(
      updateUser.execute({
        id: secondUser.id,
        name: secondUser.name,
        username: secondUser.username,
        email: user.email,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });

  it('should not be able to create a user if new username already in use', async () => {
    const secondUser = makeUser();

    await usersRepository.create(secondUser);

    await expect(
      updateUser.execute({
        id: secondUser.id,
        name: secondUser.name,
        username: user.username,
        email: secondUser.email,
      }),
    ).rejects.toBeInstanceOf(UserInfoError);
  });

  it('should not be able to update a invalid user', async () => {
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
