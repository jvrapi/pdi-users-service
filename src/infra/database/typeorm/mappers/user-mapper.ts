import { User as UserEntity } from '../entities/user.entity';
import { User } from '@/app/entities/user';
export class UserMapper {
  static toDomain(userEntity: UserEntity) {
    const user = new User(userEntity, userEntity.id);
    user.password = userEntity.password;
    return user;
  }
}
