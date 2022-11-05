import { ExerciseModel } from '.';
import { IExerciseModel } from '../../types';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

describe('ExerciseModel test', () => {
  it('should fail if content is bigger than 100 chars', () => {
    try {
      new ExerciseModel({
        userId: 1,
        created_at: new Date(),
        content:
          'Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      if (error instanceof Error) {
        expect(error.message).toStrictEqual('Content exceeds the 100 limit');
      } else {
        throw new Error('Wrong error type');
      }
    }
  });

  it('should return the right model', () => {
    const expectedResult = {
      userId: 1,
      content: 'Abc123',
      created_at: new Date(),
      id: undefined,
    } as ExerciseModel;

    const result = new ExerciseModel({
      userId: 1,
      created_at: new Date(),
      content: 'Abc123',
    });

    expect(result).toBeInstanceOf(ExerciseModel);
    expect(result).toEqual(expectedResult);
  });
});
