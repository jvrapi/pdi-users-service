import { Module } from '@nestjs/common';
import { AuthModule } from './http/modules/auth.module';
import { UserModule } from './http/modules/user.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
