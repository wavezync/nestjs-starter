import { ApiException } from '../exceptions/api.exception';
/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(ApiException)
export class ApiExceptionsFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const options = exception.options;
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
