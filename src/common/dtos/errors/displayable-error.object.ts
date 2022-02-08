import { InterfaceType } from '@nestjs/graphql';

@InterfaceType({ description: 'Represents a displayable error' })
export abstract class DisplayableError {
  /**
   * Error message
   *
   * @type {string}
   * @memberof ErrorObject
   */
  message!: string;
}
