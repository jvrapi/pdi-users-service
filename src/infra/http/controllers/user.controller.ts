import { CreateUser } from '@/app/use-cases/create-user';
import { UpdateUser } from '@/app/use-cases/update-user';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { UpdateUserBody } from '../dtos/update-user-body';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { GetUserById } from '@/app/use-cases/get-user-by-id';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly getUserById: GetUserById,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { email, name, password, username } = body;
    await this.createUser.execute({ email, name, password, username });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UpdateUserBody, @Req() req: Request) {
    const { id } = req.user as JwtPayload;
    const { email, name, username } = body;
    await this.updateUser.execute({ email, id, name, username });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Req() req: Request, @Res() response: Response) {
    const { id } = req.user as JwtPayload;
    const user = await this.getUserById.execute(id);
    if (!user) {
      response.status(HttpStatus.NO_CONTENT).send();
    } else {
      response.json({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  }
}
