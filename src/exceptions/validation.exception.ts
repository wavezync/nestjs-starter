import { ApiException } from './api.exception';
import { HttpStatus } from '@nestjs/common';
export class ValidationException extends ApiException {
  constructor(errors: any) {
    super('Validation Failed', HttpStatus.BAD_REQUEST, { errors });
  }
}
