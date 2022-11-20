import { AddExerciseUseCase } from './addExercise.usecase';
import { ILogger, IException } from '@getfit/domain';
import { IExerciseRepository } from '../entities/repositories';
import { ExerciseModel } from '../entities/model';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));
jest.mock('uuid', () => ({ v4: () => '123456789' }));

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
        code_error: 222,
        message: 'Error adding the exercise, check logs',
      });
      expect(logger.warn).toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'AddUExerciseUseCase',
        'Content is too long. request-code=we345jgt$$5'
      );
    }
  });

  it('should return the right model after insert', async () => {
    (exerciseRepository.getExercises as jest.Mock).mockReturnValue({
      count: 1,
    });

    (exerciseRepository.insert as jest.Mock).mockImplementation(
      async (exercise: ExerciseModel) => {
        return exercise;
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

    expect(result.id).toEqual('123456789');
    expect(result.userId).toEqual(1);
    expect(result.content).toEqual('Abc123A');
    expect(result.created_at).toEqual(created_at);

    const expectedModel = ExerciseModel.create({
      userId,
      content,
      created_at,
    });

    expect(exerciseRepository.insert).toHaveBeenCalledWith(expectedModel);

    expect(logger.log).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'AddUExerciseUseCase',
      'Exercise 123456789 added. request-code=we345jgt$$5'
    );
  });
});
