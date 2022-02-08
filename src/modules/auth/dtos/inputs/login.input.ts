import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  /**
   * Login should be email or username
   *
   * @example jhonedoe@example.com
   * @type {string}
   * @memberof LoginDto
   */
  @IsNotEmpty()
  login!: string;

  /**
   * Password of user
   *
   * @example abc@123
   * @type {string}
   * @memberof LoginDto
   */
  @IsNotEmpty()
  password!: string;
}
