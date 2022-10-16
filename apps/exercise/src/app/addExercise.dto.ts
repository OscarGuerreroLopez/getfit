import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddExerciseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly content: string;
}
