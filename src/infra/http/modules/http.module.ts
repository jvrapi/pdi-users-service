import { Authenticate } from '@/app/use-cases/authenticate';
import { CreateUser } from '@/app/use-cases/create-user';
import { GetUserById } from '@/app/use-cases/get-user-by-id';
import { UpdateUser } from '@/app/use-cases/update-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { JwtModule } from './jwt.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UserController, AuthController],
  providers: [CreateUser, UpdateUser, GetUserById, Authenticate],
})
export class HttpModule {}
