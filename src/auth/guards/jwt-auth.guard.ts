import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationRequest } from '../auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticationRequest = context
      .switchToHttp()
      .getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach user to the request object
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    return true; // Allow access if token is valid
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorization = request.headers['authorization'];
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null;
    }
    return authorization.replace('Bearer ', '');
  }
}
