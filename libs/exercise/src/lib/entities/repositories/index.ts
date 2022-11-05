import { IExerciseModel } from '../../types';

export interface IExerciseRepository {
  getExercises(userid: number): Promise<{
    exercises: IExerciseModel[];
    count: number;
  }>;
  insert(exercise: IExerciseModel): Promise<IExerciseModel>;
}
