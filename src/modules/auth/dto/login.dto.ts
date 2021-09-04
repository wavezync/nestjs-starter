import { IsNotEmpty } from 'class-validator';

/**
 * Login Dto
 *
 * @export
 * @class LoginDto
 */
export class LoginDto {
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
