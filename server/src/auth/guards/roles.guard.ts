import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

// The user object attached by the JwtStrategy
interface JwtUser {
  sub: string;
  phoneNumber: string;
}

// The full user object with the role
type UserWithRole = User & { role: Role };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: UserWithRole } = context
      .switchToHttp()
      .getRequest();

    // Check if the user object (which should now have the role) exists and has a role
    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
