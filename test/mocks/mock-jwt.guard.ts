import { CanActivate, ExecutionContext } from '@nestjs/common';
import MOCK_USERS from './user-mocks';

export class MockJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    // Attach a mock user to the request for testing
    req.user = { ...MOCK_USERS.user1 };
    return true;
  }
}
