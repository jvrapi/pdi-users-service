import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class GetUserById {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string) {
    return this.usersRepository.findById(userId);
  }
}
