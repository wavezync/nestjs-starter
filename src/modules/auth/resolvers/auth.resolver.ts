import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { Public } from 'common/decorators';
import { AuthService } from '../auth.service';
import { LoginResult, LoginSuccess } from '../dtos/results/login-result.object';
import { LoginInput } from '../dtos/inputs/login.input';
import { TokensObject } from '../dtos/objects/tokens.object';
import { UserNotFoundException } from '../../user/exceptions/user-not-found.exception';
import { plainToClass } from 'class-transformer';
import { UserNotFoundError } from '../../user/dtos/errors/user-not-found-error.object';

@Injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResult, {
    description: 'Login with email/password',
  })
  async loginWithPassword(
    @Args('input') input: LoginInput,
  ): Promise<typeof LoginResult> {
    try {
      const { accessToken } = await this.authService.loginUser(input);
      const result = new LoginSuccess();
      const tokenObject = new TokensObject();
      tokenObject.accessToken = accessToken;

      result.tokens = tokenObject;

      return result;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return plainToClass(UserNotFoundError, error);
      }

      throw error;
    }
  }
}
