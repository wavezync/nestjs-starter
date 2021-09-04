import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../domain/auth/auth.service';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      const req = context.switchToHttp().getRequest<Request>();
      return this.validateRequest(req);
    } catch (error) {
      this.logger.error('Error in JWTGuard', error);
      return false;
    }
  }

  async validateRequest(req: Request) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [method, token] = authHeader.split(' ');

    if (method !== 'Bearer') {
      throw new UnauthorizedException();
    }

    const user = await this.authService.authenticateWithJwt(token);
    if (!user) {
      return false;
    }
    req.user = user;
    return true;
  }
}
