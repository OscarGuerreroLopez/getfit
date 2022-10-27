import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import {
  LoggerModule,
  LoggerService,
  UserUseCasesProxyModule,
} from '@getfit/infra';

@Module({
  imports: [UserUseCasesProxyModule.register(), LoggerModule],
  controllers: [AppController],
  providers: [LoggerService],
})
export class AppModule {}
