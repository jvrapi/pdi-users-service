import { User } from '@/app/entities/user';
import { UsersRepository } from '@/app/repositories/users-repository';
import { DataSource, Repository } from 'typeorm';
import { User as UserEntity } from '../entities/user.entity';
import { Inject } from '@nestjs/common';
import { UserMapper } from '../mappers/user-mapper';

export class TypeOrmUsersRepository implements UsersRepository {
  private users: Repository<UserEntity>;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.users = dataSource.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.findOneBy({
      email,
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.users.findOneBy({
      username,
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.users.findOneBy({
      id,
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const newUser = this.users.create({
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username,
    });

    const [newUserSaved] = await this.users.save([newUser]);

    return UserMapper.toDomain(newUserSaved);
  }

  async save(user: User): Promise<User> {
    await this.users.update(user.id, {
      name: user.name,
      username: user.username,
      email: user.email,
    });

    return this.findById(user.id);
  }
}
