import { IExerciseModel } from '../../types';
import { ExerciseModel } from '../model';

export interface IExerciseRepository {
  getExercises(userid: number): Promise<{
    exercises: IExerciseModel[];
    count: number;
  }>;
  insert(exercise: ExerciseModel): Promise<IExerciseModel>;
}
