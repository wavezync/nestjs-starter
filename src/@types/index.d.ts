import { UserDto } from '../modules/user/dtos/user.dto';

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
