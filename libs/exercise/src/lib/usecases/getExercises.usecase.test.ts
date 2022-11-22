import { GetExercisesUseCase } from './getExercises.usecases';
import { ILogger, IException } from '@getfit/domain';
import { IExerciseRepository } from '../entities/repositories';
import { ExerciseModel } from '../entities/model';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));
jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('Get Exercises Use Case Test', () => {
  let exerciseRepository: IExerciseRepository;
  let logger: ILogger;
  let exception: IException;
  let getExercisesUseCase: GetExercisesUseCase;

  const mockGetExercisesRepo = {
    count: 2,
    exercises: [
      ExerciseModel.create({
        id: 'abd06458-dcbc-4855-b920-98f0f962e040',
        userId: 1,
        content: 'Abc123',
        created_at: new Date(),
      }),
      ExerciseModel.create({
        id: 'cbc9b1e3-1dc1-4bcc-b065-b46f9f6676fe',
        userId: 1,
        content: '123ABC',
        created_at: new Date(),
      }),
    ],
  };

  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    exception = {} as IException;
    exception.badRequestException = jest.fn();

    exerciseRepository = {} as IExerciseRepository;
    exerciseRepository.getExercises = jest.fn();

    getExercisesUseCase = new GetExercisesUseCase(
      exerciseRepository,
      logger,
      exception
    );
  });

  it('should get the right exercises', async () => {
    (exerciseRepository.getExercises as jest.Mock).mockReturnValue(
      mockGetExercisesRepo
    );

    const result = await getExercisesUseCase.execute(1, '123456789');

    expect(result.count).toStrictEqual(2);

    result.exercises.map((exercise, index) => {
      expect(exercise.id).toStrictEqual(
        mockGetExercisesRepo.exercises[index].id
      );

      expect(exercise.content).toStrictEqual(
        mockGetExercisesRepo.exercises[index].content
      );

      expect(exercise.userId).toStrictEqual(
        mockGetExercisesRepo.exercises[index].userId
      );

      expect(exercise.created_at).toStrictEqual(
        mockGetExercisesRepo.exercises[index].created_at
      );
    });
  });

  it('should catch any errors', async () => {
    (exerciseRepository.getExercises as jest.Mock).mockRejectedValue(
      new Error('Ugly error')
    );
    try {
      await getExercisesUseCase.execute(1, '123456789');
    } catch (error) {
      expect(exception.badRequestException).toHaveBeenCalled();
      expect(exception.badRequestException).toHaveBeenCalledWith({
        code_error: 400,
        message: 'Error getting the exercise, check logs',
      });

      expect(logger.warn).toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'GetUExerciseUseCase',
        'Ugly error. request-code=123456789'
      );
    }
  });
});
