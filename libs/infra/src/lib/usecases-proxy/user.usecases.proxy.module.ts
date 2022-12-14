import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule, UserRepository } from '../repositories/user';
import { UseCaseProxy } from './usecases-proxy';
import {
  GetUserUseCase,
  AddUserUseCase,
  LoginUseCases,
  CheckTokenUseCase,
} from '@getfit/user';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { BcryptModule, BcryptService } from '../common/bcrypt';
import { JwtModule } from '../common/jwt/jwt.module';
import { JwtTokenService } from '../common/jwt/jwt.service';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';

import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
@Module({
  imports: [
    UserRepositoryModule,
    LoggerModule,
    BcryptModule,
    JwtModule,
    EnvironmentConfigModule,
    ExceptionsModule,
  ],
})
export class UserUseCasesProxyModule {
  static GET_USER_DETAIL_USECASES_PROXY = 'GetUserDetailUseCasesProxy';
  static INSERT_USER_DETAIL_USECASES_PROXY = 'InsertUserDetailUseCasesProxy';
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static CHECK_TOKEN_USECASES_PROXY = 'CheckTokenUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UserUseCasesProxyModule,
      providers: [
        {
          inject: [UserRepository, ExceptionsService, LoggerService],
          provide: UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY,
          useFactory: (
            userRepository: UserRepository,
            exceptionsService: ExceptionsService,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new GetUserUseCase(userRepository, exceptionsService, logger)
            ),
        },
        {
          inject: [
            UserRepository,
            LoggerService,
            BcryptService,
            ExceptionsService,
          ],
          provide: UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
          useFactory: (
            userRepository: UserRepository,
            logger: LoggerService,
            bcrypt: BcryptService,
            exceptionsService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new AddUserUseCase(
                userRepository,
                logger,
                bcrypt,
                exceptionsService
              )
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            UserRepository,
            BcryptService,
            ExceptionsService,
          ],
          provide: UserUseCasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: UserRepository,
            bcryptService: BcryptService,
            exceptionsService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
                exceptionsService
              )
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            UserRepository,
            ExceptionsService,
          ],
          provide: UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            userRepo: UserRepository,
            exceptionsService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new CheckTokenUseCase(
                logger,
                jwtTokenService,
                userRepo,
                exceptionsService
              )
            ),
        },
      ],
      exports: [
        UserUseCasesProxyModule.GET_USER_DETAIL_USECASES_PROXY,
        UserUseCasesProxyModule.INSERT_USER_DETAIL_USECASES_PROXY,
        UserUseCasesProxyModule.LOGIN_USECASES_PROXY,
        UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY,
      ],
    };
  }
}
