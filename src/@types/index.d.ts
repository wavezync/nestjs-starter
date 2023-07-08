import { SelectableUser } from 'database/schema/users';

declare global {
  namespace Express {
    interface Request {
      user: SelectableUser;
    }
  }
}
