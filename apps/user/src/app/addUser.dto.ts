import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
