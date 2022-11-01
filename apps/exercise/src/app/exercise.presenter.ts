import { IAddExercise } from '@getfit/exercise';

export class ExercisePresenter {
  id: number;
  userId: number;
  content: string;
  created_at: Date;

  constructor(exerciseDetail: IAddExercise) {
    this.id = exerciseDetail.id;
    this.userId = exerciseDetail.userId;
    this.content = exerciseDetail.content;
    this.created_at = exerciseDetail.created_at;
  }
}
