import { IFormatExceptionMessage } from '@getfit/domain';
import { HttpException } from './httpException';

export class BadRequestException extends HttpException {
  constructor(data: IFormatExceptionMessage) {
    super(400, data.message, data.code_error);
  }
}
