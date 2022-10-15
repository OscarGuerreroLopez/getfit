export function infra(): string {
  return 'infra';
}

export * from '../lib/userUsecases-proxy/user.usecases.proxy.module';
export * from '../lib/userUsecases-proxy/usecases-proxy';
export * from '../lib/common/validations';
export * from '../lib/common/filters/exception.fitler';
export * from './logger/logger.module';
export * from './logger/logger.service';
