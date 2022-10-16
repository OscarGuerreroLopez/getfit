import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseRepositoryService } from './exercise-repository.service';

describe('ExerciseRepositoryService', () => {
  let service: ExerciseRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseRepositoryService],
    }).compile();

    service = module.get<ExerciseRepositoryService>(ExerciseRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
