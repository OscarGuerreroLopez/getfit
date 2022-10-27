import { Module } from '@nestjs/common';
import { GetUserGuard } from './get-user.guard';
import { UserUseCasesProxyModule } from '../../usecases-proxy/user.usecases.proxy.module';

@Module({
  imports: [UserUseCasesProxyModule.register()],
  providers: [GetUserGuard],
  exports: [],
})
export class GuardsModule {}
