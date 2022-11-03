import { ExerciseModel } from '../entities/model';

export class ExerciseEntityFactory {
  createNewExerciseModel(exercise: ExerciseModel): ExerciseModel {
    if (exercise.userId === 0 || !exercise.userId) {
      throw new Error('Incorrect or missing userID');
    }

    if (!exercise.content) {
      throw new Error('Missing content');
    }

    if (exercise.content.length > 100) {
      throw new Error('Content exceeds the 100 limit');
    }

    if (!exercise.created_at) {
      throw new Error('Missing the date');
    }

    return exercise;
  }
}
