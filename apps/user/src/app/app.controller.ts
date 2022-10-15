import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UserUseCasesProxyModule, UseCaseProxy } from '@getfit/infra';
import { AddUserDto } from './addUser.dto';
import { AddUserUseCase, GetUserUseCase, LoginUseCases } from '@getfit/user';
import { UserPresenter } from './user.presenter';

@Controller()
export class AppController {
  constructor(
    @Inject(UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY)
    private readonly addUserDetail: UseCaseProxy<AddUserUseCase>,
    @Inject(UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY)
    private readonly getUserDetail: UseCaseProxy<GetUserUseCase>,
    @Inject(UserUseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>
  ) {}

  @Get(':username')
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
  // @UseGuards(LoginGuard)
  async login(@Body() auth: AddUserDto) {
    const accessToken = await this.loginUsecaseProxy
      .getInstance()
      .validateUser(auth.username, auth.password);

    return accessToken;
  }
}
