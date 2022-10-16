import { ValidationError } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';

export const HandleValidationErrors = (
  validationErrors: ValidationError[] = []
) => {
  const logger = new LoggerService();
  const exceptions = new ExceptionsService();
  logger.log('validation', JSON.stringify(validationErrors));
  exceptions.badRequestException({ message: 'check logs' });
};
