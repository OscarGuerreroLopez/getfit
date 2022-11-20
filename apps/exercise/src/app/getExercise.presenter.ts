import { IExerciseWithUser, IGetExercise } from '@getfit/exercise';

export class GetExercisePresenter {
  count: number;
  exercises: IExerciseWithUser[];

  constructor(exercisesDetail: IGetExercise) {
    this.count = exercisesDetail.count;
    this.exercises = exercisesDetail.exercises;
  }
}
