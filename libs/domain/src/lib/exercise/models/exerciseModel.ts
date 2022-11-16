import { Entity } from '../../entity';
import { Content } from '../value-objects/content';
export interface IExerciseProps {
  userId: number;
  content: Content;
  created_at: Date;
}
export interface IExerciseModel {
  id?: string;
  userId: number;
  content: string;
  created_at: Date;
}

export declare class ExerciseModel extends Entity<IExerciseProps> {
  private constructor(props: IExerciseProps, id?: string);
  public static create(props: IExerciseModel): ExerciseModel;
}
