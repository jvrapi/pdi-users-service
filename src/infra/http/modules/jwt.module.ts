import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestJsJwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_PRIVATE_KEY,
      }),
    }),
  ],
  exports: [
    ConfigModule.forRoot(),
    NestJsJwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_PRIVATE_KEY,
      }),
    }),
  ],
})
export class JwtModule {}
