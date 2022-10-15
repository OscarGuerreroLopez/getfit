import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule, UserRepository } from '../repositories/user';
import { UseCaseProxy } from './usecases-proxy';
import { GetUserUseCase, AddUserUseCase } from '@getfit/user';

@Module({
  imports: [UserRepositoryModule],
})
export class UserUseCasesProxyModule {
  static GET_USER_DETAIL_USECASES_PROXY = 'GetUserDetailUseCasesProxy';
  static INSERT_USER_DETAIL_USECASES_PROXY = 'InsertUserDetailUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UserUseCasesProxyModule,
      providers: [
        {
          inject: [UserRepository],
          provide: UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new GetUserUseCase(userRepository)),
        },
        {
          inject: [UserRepository],
          provide: UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new AddUserUseCase(userRepository)),
        },
      ],
      exports: [
        UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY,
        UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
      ],
    };
  }
}
