import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { UserUseCasesProxyModule, UseCaseProxy } from '@getfit/infra';
import { AddUserDto } from './addUser.dto';
import { AddUserUseCase, GetUserUseCase } from '@getfit/user';
import { UserPresenter } from './user.presenter';

@Controller()
export class AppController {
  constructor(
    @Inject(UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY)
    private readonly addUserDetail: UseCaseProxy<AddUserUseCase>,
    @Inject(UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY)
    private readonly getUserDetail: UseCaseProxy<GetUserUseCase>,
    private readonly appService: AppService
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
}
