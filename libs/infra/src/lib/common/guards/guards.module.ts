import { Module } from '@nestjs/common';
import { GetUserGuard } from './getUser.guard';
import { UserUseCasesProxyModule } from '../../usecases-proxy/user.usecases.proxy.module';

@Module({
  imports: [UserUseCasesProxyModule.register()],
  providers: [GetUserGuard],
  exports: [],
})
export class GuardsModule {}
