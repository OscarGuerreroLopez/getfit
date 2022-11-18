import { ExerciseEntity } from './exercise';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

describe('Exercise Entity test', () => {
  it('should return a good user', () => {
    const user = ExerciseEntity.creaate({
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    expect(user.userId).toStrictEqual(1);
    expect(user.content).toStrictEqual('blablabla');
    expect(user.created_at).toStrictEqual(new Date('2022-11-04T00:00:00.000Z'));

    console.log('@@@111', user.id);
  });

  it('should vaidate if two entities are the same', () => {
    const user1 = ExerciseEntity.creaate({
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    const user2 = ExerciseEntity.creaate({
      id: user1.id,
      userId: 1,
      content: 'blablabla',
      created_at: new Date(),
    });

    const user3 = ExerciseEntity.creaate({
      id: user1.id,
      userId: 2,
      content: 'xxxxx',
      created_at: new Date(),
    });

    expect(user1.equals(user2)).toBeTruthy();
    expect(user1.equals(user3)).toBeFalsy();
  });

  it('shuld return an error if content is too short', () => {
    try {
      ExerciseEntity.creaate({
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

  it('shuld return an error if content is too lomg', () => {
    try {
      ExerciseEntity.creaate({
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
      ExerciseEntity.creaate({
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
});
