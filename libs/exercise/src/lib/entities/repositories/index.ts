import { ExerciseModel } from '../model';

export interface ExerciseRepository {
  getExercises(
    userid: number
  ): Promise<{ exercises: ExerciseModel[]; count: number }>;
  insert(exercise: ExerciseModel): Promise<ExerciseModel>;
}
