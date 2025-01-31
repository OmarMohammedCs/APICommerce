import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard  implements CanActivate {
  constructor(private reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

  const requireRole = 'admin'
  const request = context.switchToHttp().getRequest()
  const user = request.user
  if (!user) return false

  return requireRole === user.role






    
  }



  
}
