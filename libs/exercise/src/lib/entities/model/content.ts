import { ValueObject } from '@getfit/domain';

interface ContentProps {
  value: string;
}

export class Content extends ValueObject<ContentProps> {
  get value(): string {
    return this.props.value;
  }

  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: ContentProps) {
    super(props);
  }

  public static create(content: string): Content {
    if (content === undefined || content === null || content.length > 100) {
      throw new Error('Content is missing or exceeds the 100 limit');
    } else {
      return new Content({ value: content });
    }
  }
}
