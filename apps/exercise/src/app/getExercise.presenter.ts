import { IGetExercise } from '@getfit/exercise';

export class GetExercisePresenter {
  count: number;
  user: { name: string };
  exercises: {
    id: string;
    content: string;
    userId: number;
    created_at: Date;
  }[];

  constructor(exercisesDetail: IGetExercise, name: string) {
    this.count = exercisesDetail.count;
    this.user = { name };
    this.exercises = exercisesDetail.exercises.map((exercise) => ({
      id: exercise.id,
      content: exercise.content,
      userId: exercise.userId,
      created_at: exercise.created_at,
    }));
  }
}
