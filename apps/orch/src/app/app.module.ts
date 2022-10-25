import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserUseCasesProxyModule } from '@getfit/infra';

@Module({
  imports: [UserUseCasesProxyModule.register()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
