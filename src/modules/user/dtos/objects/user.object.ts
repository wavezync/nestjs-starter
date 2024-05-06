import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserObject {
  @Field(() => ID, { description: 'ID of the user' })
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
   * Name of user
   *
   * @type {string}
   * @memberof UserObject
   */
  name!: string;

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
