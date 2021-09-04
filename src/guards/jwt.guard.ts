import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';
import { Request } from 'express';

export class JwtGuard implements CanActivate {
  constructor(private readonly authServie: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest<Request>();
      return this.validateRequest(req);
    } catch (error) {
      return false;
    }
  }

  async validateRequest(req: Request) {
    const [method, token] = req.header('authorization').split(' ');

    if (method !== 'Bearer') {
      return false;
    }

    const user = this.authServie.authenticateWithJwt(token);
    if (!user) {
      return false;
    }
    // req.user = user.toDto();
    return true;
  }
}
