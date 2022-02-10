import { applyDecorators } from '@nestjs/common';
import { TemplatedApiException } from './templated-api-exception.decorator';
import { ResourceConflictException } from '../exceptions/resource-conflict.exception';

export function ApiResourceConflictException() {
  return applyDecorators(
    TemplatedApiException(() => ResourceConflictException, {
      description: 'Resource exists',
    }),
  );
}
