import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import {
  ExerciseUseCasesProxyModule,
  UseCaseProxy,
  ExceptionsService,
  LoggerService,
  UserExerciseGuard,
} from '@getfit/infra';
import { AddExerciseUseCase, GetExercisesUseCase } from '@getfit/exercise';
import { AddExerciseDto } from './addExercise.dto';
import { ExercisePresenter } from './exercise.presenter';

@Controller()
export class AppController {
  constructor(
    private readonly exceptionService: ExceptionsService,
    @Inject(ExerciseUseCasesProxyModule.ADD_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly addExerciseDetail: UseCaseProxy<AddExerciseUseCase>,
    @Inject(ExerciseUseCasesProxyModule.GET_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly getExercisesDetail: UseCaseProxy<GetExercisesUseCase>,
    private readonly logger: LoggerService
  ) {}

  @Get()
  async getExercises(@Request() req: RequestExpress) {
    const user = req.headers['user'] as string;

    if (!user) {
      this.logger.warn(
        'get exercise',
        `there is no user on this request ${req.headers['request-code']}`
      );
      this.exceptionService.badRequestException({
        message: 'Cannot post this exercise, check logs',
        code_error: 400,
      });
    }

    const parsedUser = JSON.parse(user);

    const getExercises = await this.getExercisesDetail
      .getInstance()
      .execute(parsedUser.userId, parsedUser.username);

    return getExercises;
  }

  @Post()
  async addExercise(
    @Body() exerciseDto: AddExerciseDto,
    @Request() req: RequestExpress
  ) {
    const user = req.headers['user'] as string;

    if (!user) {
      this.logger.warn(
        'add exercise',
        `there is no user on this request ${req.headers['request-code']}`
      );
      this.exceptionService.badRequestException({
        message: 'Cannot post this exercise, check logs',
        code_error: 400,
      });
    }

    const parsedUser = JSON.parse(user);

    const exerciseCreated = await this.addExerciseDetail
      .getInstance()
      .execute(parsedUser.userId, exerciseDto.content);

    return new ExercisePresenter(exerciseCreated);
  }
}
