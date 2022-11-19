import { ExerciseModel } from './exercise';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

describe('Exercise Entity test', () => {
  it('should return a good exercise', () => {
    const exercise = ExerciseModel.create({
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    expect(exercise.userId).toStrictEqual(1);
    expect(exercise.content).toStrictEqual('blablabla');
    expect(exercise.created_at).toStrictEqual(
      new Date('2022-11-04T00:00:00.000Z')
    );
  });

  it('should vaidate if two entities are the same', () => {
    const exercise1 = ExerciseModel.create({
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    const exercise2 = ExerciseModel.create({
      id: exercise1.id,
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    const exercise3 = ExerciseModel.create({
      id: exercise1.id,
      userId: 2,
      content: 'xxxxx',
      created_at: new Date(),
    });

    const exercise4 = ExerciseModel.create({
      userId: 2,
      content: 'xxxxx',
      created_at: new Date(),
    });

    expect(exercise1.equals(exercise2)).toBeTruthy();
    expect(exercise1.equals(exercise3)).toBeTruthy();
    expect(exercise1.equals(exercise4)).toBeFalsy();
  });

  it('shuld return an error if content is too short', () => {
    try {
      ExerciseModel.create({
        userId: 1,
        content: 'abc',
        created_at: new Date(),
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toStrictEqual('Content is too short');
      } else {
        throw new Error('Wrong error type');
      }
    }
  });

  it('should return an error if content is too lomg', () => {
    try {
      ExerciseModel.create({
        userId: 1,
        content:
          'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc',
        created_at: new Date(),
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toStrictEqual('Content is too long');
      } else {
        throw new Error('Wrong error type');
      }
    }
  });

  it('shuld return an error if userId is not correct', () => {
    try {
      ExerciseModel.create({
        userId: 0,
        content: 'abc',
        created_at: new Date(),
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toStrictEqual('incorrect userId');
      } else {
        throw new Error('Wrong error type');
      }
    }
  });

  it('should be able to update the content', () => {
    const exercise = ExerciseModel.create({
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    expect(exercise.content).toStrictEqual('blablabla');

    exercise.content = 'holahola';

    expect(exercise.content).toStrictEqual('holahola');
  });
});
