import { ExerciseModel } from '../entities/model';

export interface IGetExercise extends Pick<ExerciseModel, keyof ExerciseModel> {
  user: { name: string };
}
