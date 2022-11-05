import { ExerciseModel } from '../entities/model';

export interface IExerciseWithuser
  extends Pick<ExerciseModel, keyof ExerciseModel> {
  user: { name: string };
}

export interface IGetExercise {
  count: number;
  exercises: IExerciseWithuser[];
}
