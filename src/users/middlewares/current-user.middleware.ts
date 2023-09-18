import { Injectable, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

import { UsersService } from '../users.service'

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {}

    if (userId) {
      const user = await this.usersService.findOne(userId)

      // @ts-ignore
      request.currentUser = user
    }

    next()
  }
}
