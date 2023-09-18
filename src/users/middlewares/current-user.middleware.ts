import { Injectable, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

import { User } from '../entities/user.entity'
import { UsersService } from '../users.service'

// Обновяваме "Request" интерфейсa на Express, защото иначе TS се оплаква, че
// request няма property currentUser (ред 30)
declare global {
  namespace Express {
    // => "Намери ми 'Express' библиотеката"
    interface Request {
      // => "Намери ми 'Request' интерфейса в 'Express' библиотеката"
      currentUser?: User // => "Добави ново property към 'Request' интерфейса"
    }
  }
} // Така добавяме ново property към вече съществуващ интерфейс

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {}

    if (userId) {
      const user = await this.usersService.findOne(userId)

      request.currentUser = user
    }

    next()
  }
}
