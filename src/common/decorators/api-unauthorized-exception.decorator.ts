import { applyDecorators } from '@nestjs/common';
import { TemplatedApiException } from './templated-api-exception.decorator';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

export function ApiUnauthorizedException() {
  return applyDecorators(
    TemplatedApiException(() => new UnauthorizedException(), {
      description: 'Unauthorized',
    }),
  );
}
