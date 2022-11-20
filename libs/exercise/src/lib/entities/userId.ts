import { PrimitiveValueObject } from '@getfit/domain';

export class UserId extends PrimitiveValueObject<number> {
  static create(value: number): UserId {
    if (!(value > 0)) {
      throw new Error('incorrect userId');
    }
    return new UserId(value);
  }
}
