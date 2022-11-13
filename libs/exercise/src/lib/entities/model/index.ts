// to do delete IExercisemodel from types
// import { IExerciseModel } from '../../types';

import { Content } from './content';
import { Entity } from '@getfit/domain';

interface ExerciseProps {
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

export class ExerciseModel extends Entity<ExerciseProps> {
  userId: number;
  content: Content;
  created_at: Date;

  private constructor(props: ExerciseProps, id?: string) {
    super(props, id);
    this.content = props.content;
    this.userId = props.userId;
    this.created_at = props.created_at;
  }

  public static create(props: IExerciseModel) {
    if (!props.content) {
      throw new Error('Must provide a content ');
    }

    if (!props.created_at) {
      throw new Error('created date must be supplied');
    }

    if (!props.userId) {
      throw new Error('missing userId');
    }

    const content = Content.create(props.content);

    return new ExerciseModel({ ...props, content }, props.id);
  }
}
