import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddExerciseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly content: string;
}
