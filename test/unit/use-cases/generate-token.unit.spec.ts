import { GenerateToken } from '@/app/use-cases/generate-token';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from '@test/factories/user-factory';

describe('Generate token use case', () => {
  let jwtService: JwtService;
  let generateToken: GenerateToken;

  beforeEach(() => {
    console.log({
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
    });
    jwtService = new JwtService({
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256',
      },
    });
    generateToken = new GenerateToken(jwtService);
  });

  it('should be able to generate token', async () => {
    const user = makeUser();
    user.password = '2cfN';
    const { token } = await generateToken.execute(user);
    expect(token).toBeTruthy();
  });
});
