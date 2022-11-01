import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import {
  ExerciseUseCasesProxyModule,
  UseCaseProxy,
  ExceptionsService,
  LoggerService,
} from '@getfit/infra';
import {
  AddExerciseUseCase,
  GetExercisesUseCase,
  IAddExercise,
  IGetExercise,
} from '@getfit/exercise';
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
  async getExercises(@Request() req: RequestExpress): Promise<IGetExercise[]> {
    const parsedUser = JSON.parse(req.headers['user'] as string);

    const getExercises: IGetExercise[] = await this.getExercisesDetail
      .getInstance()
      .execute(parsedUser.userId, parsedUser.username);

    return getExercises;
  }

  @Post()
  async addExercise(
    @Body() exerciseDto: AddExerciseDto,
    @Request() req: RequestExpress
  ): Promise<IAddExercise> {
    const request_code = req.headers['request-code'] as string;

    const parsedUser = JSON.parse(req.headers['user'] as string);

    const exerciseCreated: IAddExercise = await this.addExerciseDetail
      .getInstance()
      .execute(parsedUser.userId, exerciseDto.content, request_code);

    return new ExercisePresenter(exerciseCreated);
  }
}
