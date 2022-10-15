import { ValidationError } from '@nestjs/common';

export const HandleValidationErrors = (
  validationErrors: ValidationError[] = []
) => {
  throw new Error(`@@@ ${JSON.stringify(validationErrors)}`);
};
