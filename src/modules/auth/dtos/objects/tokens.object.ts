import { ObjectType } from '@nestjs/graphql';

@ObjectType('Tokens')
export class TokensObject {
  /**
   * Represents the access token
   *
   * @type {string}
   * @memberof TokenObject
   */
  accessToken!: string;
}
