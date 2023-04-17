import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateToken {
  constructor(private readonly jwtService: JwtService) {}
  async execute(user: User) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
