import { PrimitiveValueObject } from '@getfit/domain';

export class Content extends PrimitiveValueObject<string> {
  static create(value: string): Content {
    if (!value) {
      throw new Error('missing content');
    }

    if (value.length > 100) {
      throw new Error('Content is too long');
    }

    if (value.length < 5) {
      throw new Error('Content is too short');
    }
    return new Content(value);
  }
}
