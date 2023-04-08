import { Authenticate } from '@/app/use-cases/authenticate';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticateUserBody } from '../dtos/authenticate-user-body';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUser: Authenticate) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() body: AuthenticateUserBody) {
    return this.authenticateUser.execute(body);
  }
}
