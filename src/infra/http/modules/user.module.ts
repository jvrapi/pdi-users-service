import { CreateUser } from '@/app/use-cases/create-user';
import { GetUserById } from '@/app/use-cases/get-user-by-id';
import { UpdateUser } from '@/app/use-cases/update-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { MessagingModule } from '@/infra/messaging/messaging.module';

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [UserController],
  providers: [CreateUser, UpdateUser, GetUserById],
})
export class UserModule {}
