import { PrimitiveValueObject } from '@getfit/domain';

export class DateVO extends PrimitiveValueObject<Date> {
  static create(value: Date): DateVO {
    if (!(value instanceof Date)) {
      throw new Error('incorrect userId');
    }
    return new DateVO(value);
  }
}
