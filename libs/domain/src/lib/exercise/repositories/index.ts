import { ExerciseModel } from '../models/exerciseModel';

export interface IExerciseRepository {
  getExercises(userid: number): Promise<{
    exercises: ExerciseModel[];
    count: number;
  }>;
  insert(exercise: ExerciseModel): Promise<ExerciseModel>;
}
