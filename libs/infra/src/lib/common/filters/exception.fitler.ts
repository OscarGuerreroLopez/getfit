import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { IFormatExceptionMessage } from '@getfit/domain';
import { HttpException } from '../../exceptions/httpException';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getMessage() as IFormatExceptionMessage)
        : { message: 'check logs', code_error: undefined };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        code: request.headers['request-code'],
      },
      ...message,
    };

    this.logMessage(request, message, status);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: {
      path: unknown;
      method: unknown;
      headers: { [x: string]: unknown };
    },
    message: IFormatExceptionMessage,
    status: number
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null} request-code=${
          request.headers['request-code'] || null
        }`
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null} request-code=${
          request.headers['request-code'] || null
        }`
      );
    }
  }
}
