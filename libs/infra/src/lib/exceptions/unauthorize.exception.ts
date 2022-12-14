import { IFormatExceptionMessage } from '@getfit/domain';
import { HttpException } from './httpException';

export class UnauthorizedException extends HttpException {
  constructor(data: IFormatExceptionMessage) {
    super(401, data.message, data.code_error);
  }
}
