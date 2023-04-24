import { Module } from '@nestjs/common';
import { AuthModule } from './http/modules/auth.module';
import { UserModule } from './http/modules/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule],
})
export class AppModule {}
