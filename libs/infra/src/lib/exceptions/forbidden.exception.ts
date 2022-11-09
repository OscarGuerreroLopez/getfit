import { IFormatExceptionMessage } from '@getfit/domain';
import { HttpException } from './httpException';

export class ForbiddenException extends HttpException {
  constructor(data: IFormatExceptionMessage) {
    super(403, data.message, data.code_error);
  }
}
