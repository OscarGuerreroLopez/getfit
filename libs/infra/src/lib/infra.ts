export function infra(): string {
  return 'infra';
}

export * from './userUsecases-proxy/user.usecases.proxy.module';
export * from './userUsecases-proxy/usecases-proxy';
export * from './common/validations';
export * from './common/filters/exception.fitler';
export * from './logger/logger.module';
export * from './logger/logger.service';
export * from './common/bcrypt';
export * from './exceptions/exceptions.module';
export * from './exceptions/exceptions.service';
