import { IsNotEmpty } from 'class-validator';

export class UpdateUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
}
