import { UpdateExerciseUseCase } from './updateExercise.usecase';
import { ILogger, IException } from '@getfit/domain';
import { IExerciseRepository } from '../entities/repositories';
import { ExerciseModel } from '../entities/model';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));
jest.mock('uuid', () => ({ v4: () => '123456789' }));

const getExerciseMock = ExerciseModel.create({
  id: 'abd06458-dcbc-4855-b920-98f0f962e040',
  userId: 1,
  content: 'Abc123',
  created_at: new Date(),
});

const updateExerciseMock = ExerciseModel.create({
  id: 'abd06458-dcbc-4855-b920-98f0f962e040',
  userId: 1,
  content: '123ABC',
  created_at: new Date(),
});

describe('Get Exercises Use Case Test', () => {
  let exerciseRepository: IExerciseRepository;
  let logger: ILogger;
  let exception: IException;
  let updateExerciseUseCase: UpdateExerciseUseCase;

  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    exception = {} as IException;
    exception.badRequestException = jest.fn();

    exerciseRepository = {} as IExerciseRepository;
    exerciseRepository.getExercise = jest.fn();
    exerciseRepository.update = jest.fn();

    updateExerciseUseCase = new UpdateExerciseUseCase(
      exerciseRepository,
      logger,
      exception
    );

    (exerciseRepository.getExercise as jest.Mock).mockReturnValue(
      getExerciseMock
    );

    (exerciseRepository.update as jest.Mock).mockReturnValue(
      updateExerciseMock
    );
  });

  it('should update correctly', async () => {
    const result = await updateExerciseUseCase.execute({
      exerciseId: 'abd06458-dcbc-4855-b920-98f0f962e040',
      userId: 1,
      content: '123ABC',
    });
    expect(result.id).toStrictEqual('abd06458-dcbc-4855-b920-98f0f962e040');
    expect(result.content).toStrictEqual('123ABC');
  });

  it('should throw an error if content did not changed', async () => {
    try {
      await updateExerciseUseCase.execute(
        {
          exerciseId: 'abd06458-dcbc-4855-b920-98f0f962e040',
          userId: 1,
          content: 'Abc123',
        },
        '123456789'
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'Nothing to update. request-code=${request_code}'
        );
      } else {
        expect(exception.badRequestException).toHaveBeenCalled();
        expect(exception.badRequestException).toHaveBeenCalledWith({
          code_error: 333,
          message: 'Error updating the exercise, check logs',
        });

        expect(logger.warn).toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledWith(
          'UpdateUExerciseUseCase',
          'Nothing to update. request-code=123456789'
        );
      }
    }
  });

  it('should throw an error userId not the same as DB', async () => {
    try {
      await updateExerciseUseCase.execute(
        {
          exerciseId: 'abd06458-dcbc-4855-b920-98f0f962e040',
          userId: 2,
          content: 'Abc123',
        },
        '123456789'
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'Nothing to update. request-code=${request_code}'
        );
      } else {
        expect(exception.badRequestException).toHaveBeenCalled();
        expect(exception.badRequestException).toHaveBeenCalledWith({
          code_error: 333,
          message: 'Error updating the exercise, check logs',
        });

        expect(logger.warn).toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledWith(
          'UpdateUExerciseUseCase',
          'user 2 is trying to update an exercise that belongs to 1. ExerciseID: abd06458-dcbc-4855-b920-98f0f962e040 . request-code=123456789'
        );
      }
    }
  });

  it('should throw an error if entity not in DB', async () => {
    (exerciseRepository.getExercise as jest.Mock).mockReturnValue(undefined);

    try {
      await updateExerciseUseCase.execute(
        {
          exerciseId: 'abd06458-dcbc-4855-b920-98f0f962e040',
          userId: 2,
          content: 'Abc123',
        },
        '123456789'
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'Nothing to update. request-code=${request_code}'
        );
      } else {
        expect(exception.badRequestException).toHaveBeenCalled();
        expect(exception.badRequestException).toHaveBeenCalledWith({
          code_error: 333,
          message: 'Error updating the exercise, check logs',
        });

        expect(logger.warn).toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledWith(
          'UpdateUExerciseUseCase',
          'Not able to find the exercise in DB abd06458-dcbc-4855-b920-98f0f962e040. request-code=123456789'
        );
      }
    }
  });
});
