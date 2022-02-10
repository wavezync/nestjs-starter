import { ObjectType } from '@nestjs/graphql';
import { DisplayableError } from 'common/dtos/errors/displayable-error.object';

@ObjectType({
  implements: () => [DisplayableError],
})
export class InvalidLoginOrPasswordError implements DisplayableError {
  message!: string;
}
