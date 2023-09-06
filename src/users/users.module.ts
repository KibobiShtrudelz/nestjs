import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Това създава "repository"-то за нас
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
