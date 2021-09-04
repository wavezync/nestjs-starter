import { UserDto } from '../domain/user/dto/user.dto';

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
