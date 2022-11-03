import { ExerciseModel } from '../entities/model';

export interface IGetExercise extends ExerciseModel {
  user: { name: string };
}
