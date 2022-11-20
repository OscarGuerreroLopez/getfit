export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export declare class HttpException extends Error {
  status: number;
  message: string;
  code_error?: number;
  constructor(status: number, message: string, code_error?: number);
  getMessage(): IFormatExceptionMessage;
  getStatus(): number;
}

export declare class BadRequestException extends HttpException {
  constructor(data: IFormatExceptionMessage);
}

export declare class ForbiddenException extends HttpException {
  constructor(data: IFormatExceptionMessage);
}

export declare class UnauthorizedException extends HttpException {
  constructor(data: IFormatExceptionMessage);
}

export declare class NotFoundException extends HttpException {
  constructor(data: IFormatExceptionMessage);
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): BadRequestException;
  forbiddenException(data?: IFormatExceptionMessage): ForbiddenException;
  unauthorizedException(data?: IFormatExceptionMessage): UnauthorizedException;
  userNotFound(data?: IFormatExceptionMessage): NotFoundException;
}
