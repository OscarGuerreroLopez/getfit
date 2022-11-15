import {
  IFormatExceptionMessage,
  NotFoundException as NotFoundExceptionImp,
} from '@getfit/domain';
import { HttpException } from './httpException';

export class NotFoundException
  extends HttpException
  implements NotFoundExceptionImp
{
  constructor(data: IFormatExceptionMessage) {
    super(404, data.message, data.code_error);
  }
}
