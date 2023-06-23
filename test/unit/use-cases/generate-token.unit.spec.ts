import { GenerateToken } from '@/app/use-cases/generate-token';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from '@test/factories/user-factory';

describe('Generate token use case', () => {
  let jwtService: JwtService;
  let generateToken: GenerateToken;

  const base64ToAcii = (key: string) =>
    Buffer.from(key, 'base64').toString('ascii');

  beforeEach(() => {
    console.log({
      privateKeyBase64: process.env.JWT_PRIVATE_KEY,
      publicKeyBase64: process.env.JWT_PUBLIC_KEY,
      privateKey: base64ToAcii(process.env.JWT_PRIVATE_KEY),
      publicKey: base64ToAcii(process.env.JWT_PUBLIC_KEY),
    });
    jwtService = new JwtService({
      privateKey: base64ToAcii(process.env.JWT_PRIVATE_KEY),
      publicKey: base64ToAcii(process.env.JWT_PUBLIC_KEY),
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
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
