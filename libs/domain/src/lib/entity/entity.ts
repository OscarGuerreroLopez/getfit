import { v4 as uuidv4 } from 'uuid';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  readonly id: string;
  protected props: T;

  // Take note of this particular nuance here:
  // Why is "id" optional?
  constructor(props: T, id?: string) {
    this.id = id ? id : uuidv4();
    this.props = props;
  }

  // Entities are compared based on their referential
  // equality.
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id === object.id;
  }
}
