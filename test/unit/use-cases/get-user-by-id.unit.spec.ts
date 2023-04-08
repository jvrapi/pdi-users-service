import { GetUserById } from '@/app/use-cases/get-user-by-id';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('Get user use case', () => {
  it('should be able to get a user by id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUserById(usersRepository);
    const userData = makeUser();
    await usersRepository.create(userData);
    const user = await getUser.execute(userData.id);
    expect(user).toBeTruthy();
  });
});
