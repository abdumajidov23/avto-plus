import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.sub) {
      console.error('User yoki sub mavjud emas');
      return false;
    }

    return user.sub === request.params.id;
  }
}



// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from "@nestjs/common";
// import { Observable } from "rxjs";

// @Injectable()
// export class AdminSelfGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//     if (String(req.admin.sub) !== req.params.id) {
//       throw new ForbiddenException({
//         message: "Ruxsat etilmagan admin",
//       });
//     }

//     return true;
//   }
// }
