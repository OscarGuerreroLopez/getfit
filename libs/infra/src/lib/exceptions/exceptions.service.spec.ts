import { HttpException } from '../exceptions/httpException';

import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsService } from './exceptions.service';

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
    }).compile();

    service = module.get<ExceptionsService>(ExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a bad request exception', () => {
    const result = service.badRequestException({
      message: 'I am a bad request',
      code_error: 400,
    });

    expect(result).toBeInstanceOf(HttpException);

    expect(result.message).toStrictEqual('I am a bad request');
    const status = result.getStatus();
    expect(status).toBe(400);
  });

  it('should return a forbidden Exception', () => {
    const result = service.forbiddenException({
      message: 'I am a forbidden request',
      code_error: 400,
    });

    expect(result).toBeInstanceOf(HttpException);

    expect(result.message).toStrictEqual('I am a forbidden request');
    const status = result.getStatus();
    expect(status).toBe(403);
  });
});
