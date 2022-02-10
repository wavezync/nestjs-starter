import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'common/errors/error-codes';

export class ResourceConflictException extends BaseException {
  constructor() {
    super('Resource already exists', HttpStatus.CONFLICT, {
      errorCode: ErrorCodes.ResourceConflictError,
    });
  }
}
