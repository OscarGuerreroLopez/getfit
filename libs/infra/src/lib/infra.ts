export function infra(): string {
  return 'infra';
}

export * from './usecases-proxy/user.usecases.proxy.module';
export * from './usecases-proxy/exercises.usecases.proxy.module';
export * from './usecases-proxy/usecases-proxy';
export * from './common/validations';
export * from './common/filters/exception.fitler';
export * from './logger/logger.module';
export * from './logger/logger.service';
export * from './common/bcrypt';
export * from './exceptions/exceptions.module';
export * from './exceptions/exceptions.service';
export * from './config/environment-config/environment-config.module';
export * from './config/environment-config/environment-config.service';
export * from './common/guards';
export * from './common/jwt/jwt.module';
export * from './common/jwt/jwt.service';
