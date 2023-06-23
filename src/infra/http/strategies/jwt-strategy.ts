import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log({ [JwtStrategy.name]: process.env.JWT_PUBLIC_KEY });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }
  validate(payload: any) {
    return { id: payload.sub };
  }
}
