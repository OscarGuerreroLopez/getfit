import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { ExerciseUseCasesProxyModule, UseCaseProxy } from '@getfit/infra';
import {
  AddExerciseUseCase,
  GetExercisesUseCase,
  UpdateExerciseUseCase,
} from '@getfit/exercise';
import { AddExerciseDto } from './addExercise.dto';
import { UpdateExerciseDto } from './updateExercise.dto';
import { ExercisePresenter } from './exercise.presenter';
import { GetExercisePresenter } from './getExercise.presenter';

@Controller()
export class AppController {
  constructor(
    @Inject(ExerciseUseCasesProxyModule.ADD_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly addExerciseDetail: UseCaseProxy<AddExerciseUseCase>,
    @Inject(ExerciseUseCasesProxyModule.UPDATE_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly updateExerciseDetail: UseCaseProxy<UpdateExerciseUseCase>,
    @Inject(ExerciseUseCasesProxyModule.GET_EXERCISES_DETAIL_USECASES_PROXY)
    private readonly getExercisesDetail: UseCaseProxy<GetExercisesUseCase>
  ) {}

  @Get()
  async getExercises(@Request() req: RequestExpress) {
    const parsedUser = JSON.parse(req.headers['user'] as string);
    const request_code = req.headers['request-code'] as string;

    const getExercises = await this.getExercisesDetail
      .getInstance()
      .execute(parsedUser.userId, request_code);

    return new GetExercisePresenter(getExercises, parsedUser.username);
  }

  @Post()
  async addExercise(
    @Body() exerciseDto: AddExerciseDto,
    @Request() req: RequestExpress
  ) {
    const request_code = req.headers['request-code'] as string;

    const parsedUser = JSON.parse(req.headers['user'] as string);

    const exercise = await this.addExerciseDetail
      .getInstance()
      .execute(parsedUser.userId, exerciseDto.content, request_code);

    return new ExercisePresenter(exercise);
  }

  @Post('update')
  async updateExercise(
    @Body() exerciseDto: UpdateExerciseDto,
    @Request() req: RequestExpress
  ) {
    const request_code = req.headers['request-code'] as string;

    const parsedUser = JSON.parse(req.headers['user'] as string);

    const result = await this.updateExerciseDetail.getInstance().execute(
      {
        exerciseId: exerciseDto.id,
        userId: parsedUser.userId,
        content: exerciseDto.content,
      },
      request_code
    );

    return new ExercisePresenter(result);
  }
}
