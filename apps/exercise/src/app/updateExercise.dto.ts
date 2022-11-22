import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
