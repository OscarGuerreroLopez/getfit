import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { UserUseCasesProxyModule, UseCaseProxy } from '@getfit/infra';
import { AddUserDto } from './addUser.dto';
import { AddUserUseCase } from '@getfit/user';
import { UserPresenter } from './user.presenter';

@Controller()
export class AppController {
  constructor(
    @Inject(UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY)
    private readonly addUserDetail: UseCaseProxy<AddUserUseCase>,
    private readonly appService: AppService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  async addUser(@Body() addUserDto: AddUserDto) {
    const userCreated = await this.addUserDetail
      .getInstance()
      .execute(addUserDto);

    return new UserPresenter(userCreated);
  }
}
