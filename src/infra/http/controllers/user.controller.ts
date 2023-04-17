import { CreateUser } from '@/app/use-cases/create-user';
import { UpdateUser } from '@/app/use-cases/update-user';
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { UpdateUserBody } from '../dtos/update-user-body';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private createUser: CreateUser, private updateUser: UpdateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { email, name, password, username } = body;
    await this.createUser.execute({ email, name, password, username });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() body: UpdateUserBody) {
    const { id, email, name, username } = body;
    await this.updateUser.execute({ email, id, name, username });
  }
}
