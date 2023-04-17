import { User } from '@/app/entities/user';
import { GenerateToken } from '@/app/use-cases/generate-token';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly generateToken: GenerateToken) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    return await this.generateToken.execute(user);
  }
}
