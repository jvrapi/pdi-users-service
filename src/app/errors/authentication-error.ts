import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationError extends HttpException {
  constructor() {
    super('Credenciais inválidas', HttpStatus.BAD_REQUEST);
  }
}
