import { User } from 'database/schema/users';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
