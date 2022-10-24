import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserUseCasesProxyModule } from '@getfit/infra';

@Module({
  imports: [UserUseCasesProxyModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
