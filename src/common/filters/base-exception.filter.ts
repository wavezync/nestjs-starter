import { BaseException } from '../exceptions/base.exception';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ContextType,
} from '@nestjs/common';
import { Response } from 'express';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(BaseException)
export class BaseExceptionsFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const gqlHost = GqlArgumentsHost.create(host);
    if (gqlHost.getType<ContextType | 'graphql'>() === 'graphql') {
      return exception;
    }

    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const options = exception.extra;
    const error = exception.name;

    response.status(status).json({
      statusCode: status,
      message,
      error,
      errorCode: options.errorCode,
      errors: options.errors,
    });
  }
}
