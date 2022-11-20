import { IGetExercise } from '@getfit/exercise';

export class GetExercisePresenter {
  count: number;
  user: { name: string; userId: number };
  exercises: { id: string; content: string; created_at: Date }[];

  constructor(exercisesDetail: IGetExercise) {
    this.count = exercisesDetail.count;
    this.user = exercisesDetail.user;
    this.exercises = exercisesDetail.exercises;
  }
}
