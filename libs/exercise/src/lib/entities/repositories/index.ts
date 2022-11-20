import { ExerciseModel } from '../model';

export interface IExerciseRepository {
  getExercises(userid: number): Promise<{
    exercises: ExerciseModel[];
    count: number;
  }>;
  insert(exercise: ExerciseModel): Promise<ExerciseModel>;
  update(exercise: ExerciseModel): Promise<ExerciseModel>;
}
