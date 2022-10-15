import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { UserUseCasesProxyModule } from '@getfit/infra';

@Module({
  imports: [UserUseCasesProxyModule.register()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
