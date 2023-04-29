import { ValidationException } from 'common/exceptions';
import { GraphQLFormattedError } from 'graphql';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { AuthenticationError, UserInputError } from '@nestjs/apollo';
import { unwrapResolverError } from '@apollo/server/errors';

export function formatGraphQLError(
  formattedError: GraphQLFormattedError,
  err: unknown,
): GraphQLFormattedError {
  if (unwrapResolverError(err) instanceof ValidationException) {
    const extensions = {
      errors: err,
    };

    return new UserInputError('Validation failed', { extensions });
  }

  if (unwrapResolverError(err) instanceof UnauthorizedException) {
    const e = unwrapResolverError(err) as UnauthorizedException;
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(e.message, { extensions });
  }

  if (unwrapResolverError(err) instanceof TokenExpiredError) {
    const e = unwrapResolverError(err) as TokenExpiredError;
    const extensions = {
      code: 'UNAUTHENTICATED',
    };

    return new AuthenticationError(e.message, { extensions });
  }

  return formattedError;
}
