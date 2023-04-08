import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersRepository } from '../repositories/users-repository';
import { AuthenticationError } from '../errors/authentication-error';
import { InternalError } from '../errors/internal-error';

interface AuthenticateUserUseCaseRequest {
  username: string;
  password: string;
}

@Injectable()
export class Authenticate {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ username, password }: AuthenticateUserUseCaseRequest) {
    try {
      if (!username || !password) {
        throw new AuthenticationError();
      }

      let user = await this.usersRepository.findByUsername(username);

      if (this.isEmail(username)) {
        user = await this.usersRepository.findByEmail(username);
      }

      if (!user) {
        throw new AuthenticationError();
      }

      const passwordIsCorrect = await compare(password, user.password);

      if (!passwordIsCorrect) {
        throw new AuthenticationError();
      }
      const payload = {
        sub: user.id,
      };

      const token = await this.jwtService.signAsync(payload);

      return { token };
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
