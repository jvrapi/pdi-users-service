import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserInfoError } from '../errors/user-info-error';

interface Request {
  name: string;
  email: string;
  password: string;
  username: string;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, username }: Request) {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    const usernameAlreadyInUse = await this.usersRepository.findByUsername(
      username,
    );

    if (emailAlreadyInUse) {
      throw new UserInfoError('E-mail already in use');
    }

    if (usernameAlreadyInUse) {
      throw new UserInfoError('Username already in use');
    }

    const user = new User({
      email,
      name,
      username,
    });

    user.password = await hash(password, 8);

    const userCreated = await this.usersRepository.create(user);

    return {
      id: userCreated.id,
    };
  }
}
