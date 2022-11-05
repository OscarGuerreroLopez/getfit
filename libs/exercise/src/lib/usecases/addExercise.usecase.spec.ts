import { AddExerciseUseCase } from './addExercise.usecase';
import { ILogger, IException } from '@getfit/domain';
import { IExerciseModel } from '../types';
import { IExerciseRepository } from '../entities/repositories';
import { ExerciseModel } from '../entities/model';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

const withLongContent = {
  userId: 1,
  content:
    'Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123Abc123',
  request_code: 'we345jgt$$5',
};

const withSortContent = {
  userId: 1,
  content: 'Abc123A',
  request_code: 'we345jgt$$5',
};
describe('addUser usecase', () => {
  let exerciseRepository: IExerciseRepository;
  let logger: ILogger;
  let exception: IException;
  let addExerciseUseCase: AddExerciseUseCase;

  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    exception = {} as IException;
    exception.badRequestException = jest.fn();

    exerciseRepository = {} as IExerciseRepository;
    exerciseRepository.getExercises = jest.fn();
    exerciseRepository.insert = jest.fn();

    addExerciseUseCase = new AddExerciseUseCase(
      exerciseRepository,
      logger,
      exception
    );
  });

  it('should throw an error if content too big', async () => {
    (exerciseRepository.getExercises as jest.Mock).mockReturnValue({
      count: 1,
    });

    (exception.badRequestException as jest.Mock).mockImplementation();
    (logger.warn as jest.Mock).mockImplementation();

    try {
      const { userId, content, request_code } = withLongContent;
      await addExerciseUseCase.execute(userId, content, request_code);
    } catch (error) {
      expect(exception.badRequestException).toHaveBeenCalled();
      expect(exception.badRequestException).toHaveBeenCalledWith({
        code_error: 400,
        message: 'Error adding the exercise, check logs',
      });
      expect(logger.warn).toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'AddUExerciseUseCase',
        'Content exceeds the 100 limit. request-code=we345jgt$$5'
      );
    }
  });

  it('should return the right model after insert', async () => {
    (exerciseRepository.getExercises as jest.Mock).mockReturnValue({
      count: 1,
    });

    (exerciseRepository.insert as jest.Mock).mockImplementation(
      async (exercise: ExerciseModel) => {
        return { ...exercise, id: 111 };
      }
    );

    (logger.log as jest.Mock).mockImplementation();
    const { userId, content, request_code } = withSortContent;
    const created_at = new Date();

    const result = await addExerciseUseCase.execute(
      userId,
      content,
      request_code
    );

    expect(result).toEqual({
      userId: 1,
      content: 'Abc123A',
      created_at,
      id: 111,
    });

    expect(exerciseRepository.insert).toHaveBeenCalledWith({
      userId,
      content,
      created_at,
      id: undefined,
    });

    expect(logger.log).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'AddUExerciseUseCase',
      'Exercise 111 added. request-code=we345jgt$$5'
    );
  });
});
