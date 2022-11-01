import { ExerciseModel } from '../entities/model';

export type IAddExercise = Pick<ExerciseModel, keyof ExerciseModel>
