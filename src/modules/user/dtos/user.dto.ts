export class UserDto {
  /**
   * User Id
   *
   * @example ffbcd8d4-7ce1-45a3-9f20-c3a63c60491e
   * @type {string}
   * @memberof UserDto
   */
  id!: string;

  /**
   * User's email
   *
   * @example jhonedoe@example.com
   * @type {string}
   * @memberof UserDto
   */
  email!: string;

  /**
   * Is user verified
   *
   * @example true
   * @type {boolean}
   * @memberof UserDto
   */
  verified!: boolean;

  /**
   * User join date
   *
   * @example 2021-09-04
   * @type {Date}
   * @memberof UserDto
   */
  createdAt!: Date;

  /**
   * User last updated
   *
   * @example 2021-09-04
   * @type {Date}
   * @memberof UserDto
   */
  updatedAt!: Date;
}
