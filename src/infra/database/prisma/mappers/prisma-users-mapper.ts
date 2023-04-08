import { User } from '@/app/entities/user';
import { User as Raw } from '@prisma/client';

export class PrismaUsersMapper {
  static toDomain(raw: Raw) {
    const user = new User(raw, raw.id);
    user.password = raw.password;
    return user;
  }

  static toPrisma(user: User) {
    return {
      email: user.email,
      name: user.name,
      username: user.username,
      password: user.password,
    };
  }
}
