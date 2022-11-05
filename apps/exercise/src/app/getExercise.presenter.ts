import { IExerciseWithuser, IGetExercise } from '@getfit/exercise';

export class GetExercisePresenter {
  count: number;
  exercises: IExerciseWithuser[];

  constructor(exercisesDetail: IGetExercise) {
    this.count = exercisesDetail.count;
    this.exercises = exercisesDetail.exercises;
  }
}
