import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { IException, IFormatExceptionMessage } from '@getfit/domain';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage) {
    return new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage) {
    return new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage) {
    return new ForbiddenException(data);
  }
  userNotFound(data?: IFormatExceptionMessage) {
    return new NotFoundException(data);
  }
  UnauthorizedException(data?: IFormatExceptionMessage) {
    return new UnauthorizedException(data);
  }
}
