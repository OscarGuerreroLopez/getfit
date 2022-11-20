import { Entity } from '@getfit/domain';
import { Content } from '../content';
import { UserId } from '../userId';
import { DateVO } from '../date';

interface ExerciseProps {
  userId: UserId;
  content: Content;
  created_at: DateVO;
}

interface ExerciseArgs {
  id?: string;
  userId: number;
  content: string;
  created_at: Date;
}

export class ExerciseModel extends Entity<ExerciseProps> {
  static create(args: ExerciseArgs): ExerciseModel {
    return new ExerciseModel(
      {
        userId: UserId.create(args.userId),
        content: Content.create(args.content),
        created_at: DateVO.create(args.created_at),
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

  set content(content: string) {
    this.props.content = Content.create(content);
  }

  get created_at() {
    return this.props.created_at.value;
  }
}
