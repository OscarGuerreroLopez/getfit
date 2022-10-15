import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-config.validation';
import * as path from 'path';

const getEnvFile = () => {
  const envFile = path.resolve(__dirname, '.local.env');

  return envFile;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFile(),
      ignoreEnvFile:
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
          ? false
          : true,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
