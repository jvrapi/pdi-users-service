import { HttpException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersRepository } from '../repositories/users-repository';
import { AuthenticationError } from '../errors/authentication-error';
import { InternalError } from '../errors/internal-error';
import { User } from '../entities/user';

interface ValidateUserUseCaseRequest {
  username: string;
  password: string;
}

@Injectable()
export class ValidateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ username, password }: ValidateUserUseCaseRequest) {
    try {
      if (!username || !password) {
        throw new AuthenticationError();
      }

      let user: User;

      if (this.isEmail(username)) {
        user = await this.usersRepository.findByEmail(username);
      } else {
        user = await this.usersRepository.findByUsername(username);
      }

      if (!user) {
        throw new AuthenticationError();
      }

      const passwordIsCorrect = await compare(password, user.password);

      if (!passwordIsCorrect) {
        throw new AuthenticationError();
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalError(error.message);
    }
  }

  private isEmail(str: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(str);
  }
}
