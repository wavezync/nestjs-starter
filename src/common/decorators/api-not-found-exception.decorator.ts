import { applyDecorators } from '@nestjs/common';
import { TemplatedApiException } from './templated-api-exception.decorator';
import { NotFoundException } from '../exceptions/not-found.exception';

export function ApiNotFoundException(resouce?: string | number) {
  return applyDecorators(
    TemplatedApiException(() => new NotFoundException(resouce || 'resouce'), {
      description: 'Resource not found',
    }),
  );
}
