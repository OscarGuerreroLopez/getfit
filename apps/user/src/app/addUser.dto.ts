import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @MinLength(6)
  readonly password: string;
}
