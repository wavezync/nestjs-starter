import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Create user
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto {
  /**
   * Email of user
   *
   * @example jhonedoe@example.com
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsEmail() // this will be applied and enforced by class-validator
  email!: string;

  /**
   * Password for user
   *
   * @example abc@123
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  password!: string;
}
