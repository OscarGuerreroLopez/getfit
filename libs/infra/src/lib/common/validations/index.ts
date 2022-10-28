import { ValidationError } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';

const logger = new LoggerService();
const exceptions = new ExceptionsService();

export const HandleValidationErrors = (
  validationErrors: ValidationError[] = []
) => {
  logger.warn('validation', JSON.stringify(validationErrors));
  exceptions.badRequestException({ message: 'check logs' });
};
