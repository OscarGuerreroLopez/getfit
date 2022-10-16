import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import {
  UserUseCasesProxyModule,
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@getfit/infra';

@Module({
  imports: [UserUseCasesProxyModule.register(), EnvironmentConfigModule],
  controllers: [AppController],
  providers: [EnvironmentConfigService],
})
export class AppModule {}
