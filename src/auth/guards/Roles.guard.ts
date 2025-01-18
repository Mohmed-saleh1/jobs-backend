import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';

export const RoleGuard = (requiredRole: string): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) {
        throw new UnauthorizedException('Authentication required');
      }

      if (!user.role) {
        throw new UnauthorizedException('User role not found');
      }

      if (user.role !== requiredRole) {
        throw new UnauthorizedException(
          `Access denied. Required role: ${requiredRole}`,
        );
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
