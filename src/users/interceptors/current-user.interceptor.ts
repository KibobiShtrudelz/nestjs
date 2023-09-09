import { Injectable, CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common'

import { UsersService } from '../users.service'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest()
    const { userId } = request.session || {}

    if (userId) {
      const user = await this.usersService.findOne(userId)

      request.currentUser = user // "currentUser" го възлагаме на самият request, за да може после да се изконсумира от CurrentUser декоратора
    }

    return next.handle()
  }
}
