import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { ValidationException } from 'common/exceptions';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

export function formatGraphQLError(
  err: GraphQLError,
): GraphQLFormattedError<Record<string, any>> {
  if (err.originalError instanceof ValidationException) {
    const extensions = {
      errors: err.originalError.options.errors,
    };

    return new UserInputError('Validation failed', extensions);
  }

  if (err.originalError instanceof UnauthorizedException) {
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(err.originalError.message, extensions);
  }

  if (err.originalError instanceof TokenExpiredError) {
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(err.originalError.message, extensions);
  }

  return err;
}
