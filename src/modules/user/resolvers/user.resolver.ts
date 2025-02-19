import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, Public } from 'common/decorators';
import { UserObject } from '../dtos/objects/user.object';
import {
  UserRegistrationResult,
  UserRegistrationSuccess,
} from '../dtos/results/registration-result.object';
import { UserService } from '../user.service';

import { EmailAlreadyTakenException } from '../exceptions/email-already-taken.exception';
import { plainToClass } from 'class-transformer';
import { EmailAlreadyTakenError } from '../dtos/errors/email-already-taken-error.object';
import { RegisterUserInput } from '../dtos/inputs/register-user.input';
import { User } from 'database/schema/users';
import { UserModel } from '../models/user.model';

@Resolver(() => UserObject)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserObject, {
    name: 'me',
    description: 'Get current user',
  })
  getMe(@CurrentUser() user: User): UserObject {
    return new UserModel(user).toDto();
  }

  @Public()
  @Mutation(() => UserRegistrationResult, {
    description: 'Register user account',
  })
  async registerUser(
    @Args('input') input: RegisterUserInput,
  ): Promise<typeof UserRegistrationResult> {
    try {
      await this.userService.registerUser(input);
      const result = new UserRegistrationSuccess();
      result.message = 'Success';
      return result;
    } catch (error) {
      if (error instanceof EmailAlreadyTakenException) {
        return plainToClass(EmailAlreadyTakenError, error);
      }
      throw error;
    }
  }
}
