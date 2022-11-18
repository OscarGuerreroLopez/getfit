import { AbstractValueObject } from "./abstractValueObject";

export abstract class PrimitiveValueObject<T> extends AbstractValueObject<T> {
  get value(): T {
    return this._value;
  }
}
// Created for when you want to treat primitive values
// as value objects
