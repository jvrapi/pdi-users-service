import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserBody {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
}
