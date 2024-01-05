// import { Injectable, ExecutionContext } from '@nestjs/common'
// import { GqlExecutionContext } from '@nestjs/graphql'
// import { AuthGuard } from '@nestjs/passport'


// @Injectable()
// export class GqlAuthGuard extends AuthGuard('jwt') {
//     constructor() {
//         super()
//     }


//     getRequest(context: ExecutionContext) {
//         const ctx = GqlExecutionContext.create(context)
//         return ctx.getContext().req
//     }
// }


import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req) {
      throw new UnauthorizedException('No request object in context');
    }

    return req;
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req) {
      throw new UnauthorizedException('No request object in context');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('Authentication failed:', err || info);

      throw err || new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
