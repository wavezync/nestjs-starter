import { applyDecorators } from '@nestjs/common';
import { TemplatedApiException } from './templated-api-exception.decorator';
import { ValidationException } from '../exceptions/validation.exception';

export function ApiValidationException() {
  return applyDecorators(
    TemplatedApiException(() => new ValidationException([]), {
      description: 'Validation Failed',
    }),
  );
}
