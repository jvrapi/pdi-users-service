import { ValidateUser } from '@/app/use-cases/validate-user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUser: ValidateUser) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.validateUser.execute({ username, password });
    return user;
  }
}
