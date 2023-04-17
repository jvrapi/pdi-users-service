import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { UserInfoError } from '../errors/user-info-error';

interface Request {
  id: string;
  email: string;
  name: string;
  username: string;
}

@Injectable()
export class UpdateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, email, name, username }: Request) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserInfoError('User not found');
    }

    if (email && email !== user.email) {
      const newEmailAlreadyInUse = await this.usersRepository.findByEmail(
        email,
      );
      if (newEmailAlreadyInUse) {
        throw new UserInfoError('New e-mail already in use');
      }
    }

    if (username && username !== user.username) {
      const newUsernameAlreadyInUse = await this.usersRepository.findByUsername(
        username,
      );
      if (newUsernameAlreadyInUse) {
        throw new UserInfoError('New username already in use');
      }
    }

    user.email = email;
    user.name = name;
    user.username = username;

    const userUpdated = await this.usersRepository.save(user);

    return userUpdated;
  }
}
