import { ObjectType, createUnionType } from '@nestjs/graphql';
import { TokensObject } from '../objects/tokens.object';
import { UserNotFoundError } from '../../../user/dtos/errors/user-not-found-error.object';

@ObjectType()
export class LoginSuccess {
  /**
   * Login related tokens
   *
   * @type {TokensObject}
   * @memberof LoginSuccess
   */
  tokens!: TokensObject;
}

export const LoginResult = createUnionType({
  name: 'LoginResult',
  description: 'Login result',
  types: () => [LoginSuccess, UserNotFoundError],
});
