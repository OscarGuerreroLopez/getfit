import { IExerciseModel } from '../../types';

export class ExerciseModel {
  public id?: number;
  public userId!: number;
  public content!: string;
  public created_at!: Date;

  constructor(model: IExerciseModel) {
    this.userId = this.makeUserId(model.userId);
    this.content = this.makeContent(model.content);
    this.created_at = this.makeCreatedAt(model.created_at);
    this.id = model.id;
  }

  private makeUserId(userId: number | undefined) {
    if (userId === 0 || !userId) {
      throw new Error('Incorrect or missing userID');
    }

    return userId;
  }

  private makeContent(content: string | undefined) {
    if (!content) {
      throw new Error('Missing content');
    }

    if (content.length > 100) {
      throw new Error('Content exceeds the 100 limit');
    }

    return content;
  }

  private makeCreatedAt(date: Date | undefined) {
    if (!date) {
      throw new Error('Missing the date');
    }

    return date;
  }
}
