import { AbstractValueObject } from './abstractValueObject';

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<
  T extends ValueObjectProps
> extends AbstractValueObject<T> {}
