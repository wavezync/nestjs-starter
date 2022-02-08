import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
export class ValidationException extends BaseException {
  constructor(errors: any) {
    super('Validation Failed', HttpStatus.BAD_REQUEST, { errors });
  }
}
