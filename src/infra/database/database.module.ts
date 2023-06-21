import { Module } from '@nestjs/common';
import { UsersRepository } from '@/app/repositories/users-repository';
import { databaseProviders } from './typeorm/database.provider';
import { TypeOrmUsersRepository } from './typeorm/repositories/typeorm-users-repository';

@Module({
  providers: [
    ...databaseProviders,
    {
      provide: UsersRepository,
      useClass: TypeOrmUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
