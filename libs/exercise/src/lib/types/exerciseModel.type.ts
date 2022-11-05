import { ExerciseModel } from '../entities/model';

export type IExerciseModel = Pick<ExerciseModel, keyof ExerciseModel>;
