import { User } from '@/app/entities/user';
import { UsersRepository } from '@/app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    return (
      this.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      ) || null
    );
  }
  async findByUsername(username: string): Promise<User> {
    return (
      this.users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase(),
      ) || null
    );
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id) || null;
  }
  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);
    this.users[userIndex] = user;
    return user;
  }
}
