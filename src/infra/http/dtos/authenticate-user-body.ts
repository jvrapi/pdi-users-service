import { IsNotEmpty } from 'class-validator';

export class AuthenticateUserBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
