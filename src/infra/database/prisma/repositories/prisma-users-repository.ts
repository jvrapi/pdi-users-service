import { User } from '@/app/entities/user';
import { UsersRepository } from '@/app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUsersMapper } from '../mappers/prisma-users-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }
    return PrismaUsersMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUsersMapper.toDomain(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return PrismaUsersMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: PrismaUsersMapper.toPrisma(user),
    });

    return PrismaUsersMapper.toDomain(userCreated);
  }

  async save({ id, email, name, username }: User): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        username,
        updatedAt: new Date(),
      },
    });

    return PrismaUsersMapper.toDomain(userUpdated);
  }
}
