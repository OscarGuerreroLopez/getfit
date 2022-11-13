import { ExerciseModel } from '.';
import { Content } from './content';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

describe('ExerciseModel test', () => {
  it('should fail if content is bigger than 100 chars', () => {
    try {
      ExerciseModel.create({
        userId: 1,
        created_at: new Date(),
        content:
          'Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      if (error instanceof Error) {
        expect(error.message).toStrictEqual(
          'Content is missing or exceeds the 100 limit'
        );
      } else {
        throw new Error('Wrong error type');
      }
    }
  });

  it('should return the right model', () => {
    const result = ExerciseModel.create({
      userId: 1,
      created_at: new Date(),
      content: 'Abc123',
    });

    const expectedResult = {
      userId: 1,
      content: 'Abc123',
      created_at: new Date(),
      id: result.id,
    };

    expect(result).toBeInstanceOf(ExerciseModel);
    expect({
      userId: result.userId,
      id: result.id,
      content: result.content.value,
      created_at: result.created_at,
    }).toEqual(expectedResult);
  });

  it('should update the user entity correctly', () => {
    const exercise1 = ExerciseModel.create({
      userId: 1,
      created_at: new Date(),
      content: 'Abc123',
    });

    const exercise2 = ExerciseModel.create({
      id: exercise1.id,
      userId: exercise1.userId,
      created_at: exercise1.created_at,
      content: 'Abc123Abc123',
    });

    expect(exercise1.equals(exercise2)).toBeTruthy();

    expect(exercise1.content.equals(exercise2.content)).toBeFalsy();
  });
});
