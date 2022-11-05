import { IExerciseModel } from '../types';

export interface IExerciseWithuser extends IExerciseModel {
  user: { name: string };
}

export interface IGetExercise {
  count: number;
  exercises: IExerciseWithuser[];
}
