import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

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
  async getData(@Param('username') username: string) {
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
  async login(@Body() auth: LoginDto) {
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
