import { ValueObject } from '../../entity/valueObject';

export interface ContentProps {
  value: string;
}

export declare class Content extends ValueObject<ContentProps> {
  private constructor(props: ContentProps);
  get value(): string;
  public static create(content: string): Content;
}
