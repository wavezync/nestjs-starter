import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new UnauthorizedException();
    }

    const user = await this.authServie.authenticateWithJwt(token);
    if (!user) {
      return false;
    }
    req.user = user;
    return true;
  }
}
