import { IsNotEmpty, IsString } from 'class-validator';

export class AddExerciseDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
