import { Entity } from '@getfit/domain';
import { Content } from './content';
import { UserId } from './userId';

interface ExerciseProps {
  userId: UserId;
  content: Content;
  created_at: Date;
}

interface ExerciseArgs {
  id?: string;
  userId: number;
  content: string;
  created_at: Date;
}

export class ExerciseEntity extends Entity<ExerciseProps> {
  static creaate(args: ExerciseArgs): ExerciseEntity {
    return new ExerciseEntity(
      {
        userId: UserId.create(args.userId),
        content: Content.create(args.content),
        created_at: args.created_at,
      },
      args.id
    );
  }

  get userId() {
    return this.props.userId.value;
  }

  get content() {
    return this.props.content.value;
  }

  get created_at() {
    return this.props.created_at;
  }
}
