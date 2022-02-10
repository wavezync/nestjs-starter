import { applyDecorators } from '@nestjs/common';
import { TemplatedApiException } from './templated-api-exception.decorator';
import { UnknownErrorException } from '../exceptions/unknown-error.exception';

export function ApiUnknownErrorException() {
  return applyDecorators(
    TemplatedApiException(() => new UnknownErrorException(), {
      description: 'Internal Server Error',
    }),
  );
}
