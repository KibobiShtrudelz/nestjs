import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest() // На теория можем да ползваме различни протоколи, не само HTTP
    return request.session.userId
  }
}
