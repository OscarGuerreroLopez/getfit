import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  HttpCode,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { UserUseCasesProxyModule, UseCaseProxy } from '@getfit/infra';
import { AddUserDto } from './addUser.dto';
import {
  AddUserUseCase,
  GetUserUseCase,
  LoginUseCases,
  CheckTokenUseCase,
} from '@getfit/user';
import { UserPresenter } from './user.presenter';
import { AuthDto } from './auth.dto';

@Controller()
export class AppController {
  constructor(
    @Inject(UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY)
    private readonly addUserDetail: UseCaseProxy<AddUserUseCase>,
    @Inject(UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY)
    private readonly getUserDetail: UseCaseProxy<GetUserUseCase>,
    @Inject(UserUseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY)
    private readonly checkTokenUsecaseProxy: UseCaseProxy<CheckTokenUseCase>
  ) {}

  @Get(':username')
  async getData(
    @Param('username') username: string,
    @Request() req: ExpressRequest
  ) {
    console.log('@@@777', req.headers['request-code']);
    console.log('@@@888', req.headers['api-key']);
    if (req.headers['user']) {
      console.log('@@@999', JSON.parse(req.headers['user'] as string));
    }

    const result = await this.getUserDetail.getInstance().execute(username);

    return new UserPresenter(result);
  }

  @Post()
  async addUser(@Body() addUserDto: AddUserDto) {
    const userCreated = await this.addUserDetail
      .getInstance()
      .execute(addUserDto);

    return new UserPresenter(userCreated);
  }

  @Post('login')
  async login(@Body() auth: AddUserDto) {
    const accessToken = await this.loginUsecaseProxy
      .getInstance()
      .validateUser(auth.username, auth.password);

    return accessToken;
  }

  @Post('auth')
  @HttpCode(200)
  async auth(@Body() auth: AuthDto) {
    const accessToken = await this.checkTokenUsecaseProxy
      .getInstance()
      .checkToken(auth.token);

    return accessToken;
  }
}
