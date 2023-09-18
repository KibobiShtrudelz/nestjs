import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, MiddlewareConsumer } from '@nestjs/common'

import { UsersController } from './users.controller'

import { AuthService } from './auth.service'
import { UsersService } from './users.service'

import { User } from './entities/user.entity'
import { CurrentUserMiddleware } from './middlewares/current-user.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Това създава "repository"-то за нас
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
