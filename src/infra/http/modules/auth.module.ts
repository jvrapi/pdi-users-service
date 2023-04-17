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
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        signOptions: {
          expiresIn: '1h',
          algorithm: 'RS256',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [ValidateUser, GenerateToken, LocalStrategy, JwtStrategy],
})
export class AuthModule {}