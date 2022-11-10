import { IFormatExceptionMessage } from '@getfit/domain';
import { HttpException } from './httpException';

export class NotFoundException extends HttpException {
  constructor(data: IFormatExceptionMessage) {
    super(404, data.message, data.code_error);
  }
}
