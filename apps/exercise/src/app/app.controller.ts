import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import {
  ExerciseUseCasesProxyModule,
  UseCaseProxy,
  UserUseCasesProxyModule,
} from '@getfit/infra';
import { AddExerciseUseCase, GetExercisesUseCase } from '@getfit/exercise';
import { AddExerciseDto } from './addExercise.dto';
import { CheckTokenUseCase } from '@getfit/user';
import { ExercisePresenter } from './exercise.presenter';
@Controller()
export class AppController {
  constructor(
    @Inject(ExerciseUseCasesProxyModule.ADD_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly addExerciseDetail: UseCaseProxy<AddExerciseUseCase>,
    @Inject(ExerciseUseCasesProxyModule.GET_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly getExercisesDetail: UseCaseProxy<GetExercisesUseCase>,
    @Inject(UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY)
    private readonly checkTokenUsecaseProxy: UseCaseProxy<CheckTokenUseCase>
  ) {}

  @Get()
  async getExercises(@Request() req: RequestExpress) {
    const authToken = req.headers.authorization.split(' ');

    const getUser = await this.checkTokenUsecaseProxy
      .getInstance()
      .checkToken(authToken[1]);

    const getExercises = await this.getExercisesDetail
      .getInstance()
      .execute(getUser.userId, getUser.username);

    return getExercises;
  }

  @Post()
  async addExercise(
    @Body() exerciseDto: AddExerciseDto,
    @Request() req: RequestExpress
  ) {
    const authToken = req.headers.authorization.split(' ')[1];

    const getUser = await this.checkTokenUsecaseProxy
      .getInstance()
      .checkToken(authToken);

    const exerciseCreated = await this.addExerciseDetail
      .getInstance()
      .execute(getUser.userId, exerciseDto.content);

    return new ExercisePresenter(exerciseCreated);
  }
}
