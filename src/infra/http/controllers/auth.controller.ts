import { User } from '@/app/entities/user';
import { GenerateToken } from '@/app/use-cases/generate-token';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly generateToken: GenerateToken) {}
  @UseGuards(AuthGuard('local'))
  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    return await this.generateToken.execute(user);
  }
}
