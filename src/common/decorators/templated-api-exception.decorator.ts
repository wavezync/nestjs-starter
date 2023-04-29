// templated-api-exception.ts

import {
  buildPlaceholder,
  buildTemplatedApiExceptionDecorator,
} from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { ErrorCodes } from 'common/errors/error-codes';
import { BaseException } from 'common/exceptions';

export const TemplatedApiException = buildTemplatedApiExceptionDecorator(
  {
    message: '$message',
    statusCode: '$status',
    errorCode: '$errorCode',
    error: '$error',
    errors: '$errors',
  },
  {
    requiredProperties: ['statusCode', 'message', 'error'],
    placeholders: {
      errors: buildPlaceholder(
        () => BaseException,
        (exception) => exception.extra.errors || {},
      ),
      errorCode: buildPlaceholder(
        () => BaseException,
        (exception) => exception.extra.errorCode || ErrorCodes.UnknownError,
      ),
      error: buildPlaceholder(
        () => BaseException,
        (exception) => exception.name,
      ),
      message: buildPlaceholder(
        () => BaseException,
        (exception) => exception.message,
      ),
    },
  },
);
