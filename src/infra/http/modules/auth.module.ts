import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { LocalStrategy } from '../strategies/local.strategy';
import { ValidateUser } from '@/app/use-cases/validate-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { GenerateToken } from '@/app/use-cases/generate-token';
import { JwtStrategy } from '../strategies/jwt-strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [ValidateUser, GenerateToken, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
