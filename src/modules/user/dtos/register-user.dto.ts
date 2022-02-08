import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Create user
 *
 * @export
 * @class RegisterUserDto
 */
export class RegisterUserDto {
  /**
   * Email of user
   *
   * @example jhonedoe@example.com
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsEmail() // this will be applied and enforced by class-validator
  email!: string;

  /**
   * Password for user
   *
   * @example abc@123
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsNotEmpty()
  password!: string;
}
