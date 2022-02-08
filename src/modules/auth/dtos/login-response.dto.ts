import { UserDto } from 'modules/user/dtos/user.dto';

export class LoginResponseDto {
  /**
   * Access Token for user
   *
   * @example abc123......
   * @type {string}
   * @memberof LoginResponseDto
   */
  accessToken!: string;

  /**
   * User
   *
   * @type {UserDto}
   * @memberof LoginResponseDto
   */
  user!: UserDto;
}
