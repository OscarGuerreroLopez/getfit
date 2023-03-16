import { ExerciseRepositoryService } from './exercise-repository.service';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseEntity } from '../../entities/exercise.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExerciseModel } from '@getfit/exercise';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));
jest.mock('uuid', () => ({ v4: () => '123456789' }));

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

const idArray = [
  '287eca1a-a836-4d65-bbca-ba54770b1e7b',
  '287eca1a-a836-4d65-bbca-ba54770b1e8b',
];

const findAndCountMock = [
  [
    {
      content: 'Abc1235Abc1235Abc1235Abc1235',
      created_at: new Date(),
      id: 1,
      userId: 4,
      exerciseId: idArray[0],
    },
    {
      content: 'Abc1235Abc1235Abc1235Abc1235',
      created_at: new Date(),
      id: 2,
      userId: 4,
      exerciseId: idArray[1],
    },
  ],
  2,
];

const repositoryMockFactory: () => MockType<Repository<never>> = jest.fn(
  () => ({
    findAndCount: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
  })
);
describe('exercise-repository.service test', () => {
  let service: ExerciseRepositoryService;
  let repositoryMock: MockType<Repository<ExerciseEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseRepositoryService,
        {
          provide: getRepositoryToken(ExerciseEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<ExerciseRepositoryService>(ExerciseRepositoryService);
    repositoryMock = module.get(getRepositoryToken(ExerciseEntity));
  });

  it('should get the right exercises', async () => {
    let counterId = 0;
    repositoryMock.findAndCount?.mockReturnValue(findAndCountMock);
    const result = await service.getExercises(4);

    result.exercises.forEach((exercise) => {
      expect(exercise.id).toStrictEqual(idArray[counterId]);
      counterId += 1;
      expect(exercise.userId).toStrictEqual(4);
      expect(exercise.content).toStrictEqual('Abc1235Abc1235Abc1235Abc1235');
    });

    expect(result.count).toStrictEqual(2);
  });

  it('should insert and return the right value', async () => {
    repositoryMock.save?.mockReturnValue({
      content: 'Abc1235',
      created_at: new Date(),
      id: 30,
      userId: 4,
      exerciseId: '123456789',
    });

    const exerciseModel = ExerciseModel.create({
      userId: 4,
      content: 'Abc1235',
      created_at: new Date(),
      id: undefined,
    });

    const result = await service.insert(exerciseModel);

    expect(result.content).toStrictEqual('Abc1235');
    expect(result.id).toStrictEqual('123456789');
    expect(result.userId).toStrictEqual(4);
    expect(result.created_at).toEqual(new Date());
  });

  it('should update correctly', async () => {
    repositoryMock.update?.mockReturnValue({
      generatedMaps: [],
      raw: [],
      affected: 1,
    });

    const exerciseModel = ExerciseModel.create({
      userId: 4,
      content: 'Abc1235',
      created_at: new Date(),
      id: '123456789',
    });

    const result = await service.update(exerciseModel);

    expect(result.id).toStrictEqual('123456789');
  });

  it('should fail if record not found for update', async () => {
    try {
      repositoryMock.update?.mockReturnValue({
        generatedMaps: [],
        raw: [],
        affected: 0,
      });

      const exerciseModel = ExerciseModel.create({
        userId: 4,
        content: 'Abc1235',
        created_at: new Date(),
        id: '123456789',
      });

      await service.update(exerciseModel);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'cannot update 123456789. No record found'
        );
      } else {
        throw new Error('error type not correct');
      }
    }
  });
});
