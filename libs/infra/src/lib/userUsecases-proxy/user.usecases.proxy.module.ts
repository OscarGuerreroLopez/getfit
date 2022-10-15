import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule, UserRepository } from '../repositories/user';
import { UseCaseProxy } from './usecases-proxy';
import { GetUserUseCase, AddUserUseCase } from '@getfit/user';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [UserRepositoryModule, LoggerModule],
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
          inject: [UserRepository, LoggerService],
          provide: UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
          useFactory: (userRepository: UserRepository, logger: LoggerService) =>
            new UseCaseProxy(new AddUserUseCase(userRepository, logger)),
        },
      ],
      exports: [
        UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY,
        UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
      ],
    };
  }
}
