import { ExerciseModel } from '../model';

export interface IExerciseRepository {
  getExercises(userid: number): Promise<{
    exercises: ExerciseModel[];
    count: number;
  }>;
  getExercise(exerciseId: string): Promise<ExerciseModel>;
  insert(exercise: ExerciseModel): Promise<ExerciseModel>;
  update(exercise: ExerciseModel): Promise<ExerciseModel>;
}
