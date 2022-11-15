import { ExerciseModel } from '@getfit/exercise';

export class GetExercisePresenter {
  count: number;
  exercises: {
    exercise: ExerciseModel;
    user: {
      name: string;
    };
  }[];

  constructor(exercisesDetail: {
    count: number;
    exercises: {
      exercise: ExerciseModel;
      user: {
        name: string;
      };
    }[];
  }) {
    this.count = exercisesDetail.count;
    this.exercises = exercisesDetail.exercises;
  }
}
