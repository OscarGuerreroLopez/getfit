import { Module } from '@nestjs/common';
import { GetUserGuard } from './get-user.guard';
import { UserExerciseGuard } from './user-exercise.guard';
import { ApiGuardGuard } from './api-guard.guard';
import { UserUseCasesProxyModule } from '../../usecases-proxy/user.usecases.proxy.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';

import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';

@Module({
  imports: [
    UserUseCasesProxyModule.register(),
    LoggerModule,
    EnvironmentConfigModule,
  ],
  providers: [
    GetUserGuard,
    LoggerService,
    UserExerciseGuard,
    ApiGuardGuard,
    EnvironmentConfigService,
  ],
  exports: [],
})
export class GuardsModule {}
