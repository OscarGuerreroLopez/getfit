import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import {
  UserUseCasesProxyModule,
  UseCaseProxy,
  GetUserGuard,
} from '@getfit/infra';
import { AddUserDto } from './addUser.dto';
import {
  AddUserUseCase,
  GetUserUseCase,
  LoginUseCases,
  CheckTokenUseCase,
} from '@getfit/user';
import { UserPresenter } from './user.presenter';
import { AuthDto } from './auth.dto';
import { LoginDto } from './login.dto';

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
  @UseGuards(GetUserGuard)
  async getData(
    @Param('username') username: string,
    @Request() req: ExpressRequest
  ) {
    const result = await this.getUserDetail
      .getInstance()
      .execute(username, req.headers['request-code'] as string);

    return new UserPresenter(result);
  }

  @Post()
  async addUser(
    @Body() addUserDto: AddUserDto,
    @Request() req: ExpressRequest
  ) {
    const userCreated = await this.addUserDetail
      .getInstance()
      .execute(addUserDto, req.headers['request-code'] as string);

    return new UserPresenter(userCreated);
  }

  @Post('login')
  async login(@Body() auth: LoginDto, @Request() req: ExpressRequest) {
    const accessToken = await this.loginUsecaseProxy
      .getInstance()
      .validateUser(
        auth.username,
        auth.password,
        req.headers['request-code'] as string
      );

    return accessToken;
  }

  @Post('auth')
  @HttpCode(200)
  async auth(@Body() auth: AuthDto, @Request() req: ExpressRequest) {
    const accessToken = await this.checkTokenUsecaseProxy
      .getInstance()
      .execute(auth.token, req.headers['request-code'] as string);

    return accessToken;
  }
}
