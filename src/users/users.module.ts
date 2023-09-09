import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Това създава "repository"-то за нас
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ] // За да си ползваме интерцепторите трябва да ги инжектираме в "providers"
})
export class UsersModule {}
