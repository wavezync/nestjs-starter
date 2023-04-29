import { ValidationException } from 'common/exceptions';
import { GraphQLFormattedError } from 'graphql';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { AuthenticationError, UserInputError } from '@nestjs/apollo';

export function formatGraphQLError(
  formattedError: GraphQLFormattedError,
  err: unknown,
): GraphQLFormattedError {
  if (err instanceof ValidationException) {
    const extensions = {
      errors: err,
    };

    return new UserInputError('Validation failed', { extensions });
  }

  if (err instanceof UnauthorizedException) {
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(err.message, { extensions });
  }

  if (err instanceof TokenExpiredError) {
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(err.message, { extensions });
  }

  return formattedError;
}
