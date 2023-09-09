import { Get, Post, Body, Patch, Param, Query, Delete, Session, Controller } from '@nestjs/common'

import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { SignUserDto } from './dtos/sign-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { Serialize } from '../interceptors/serialize.interceptopr'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get('/who-am-i')
  whoAmI(@CurrentUser() user: User) {
    // Създавайки "CurrentUser" декоратора си правим кода четим, защото изнасяме логиката за взимане на user в самият декоратор и не я пишем тук
    return user
  }

  @Post('/sign-up')
  async createUser(@Body() body: SignUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password)

    session.userId = user.id // Обновяваме сесията с "id"-то на потребителя

    return user
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password)

    session.userId = user.id // Обновяваме сесията с "id"-то на потребителя

    return user
  }

  @Post('/sign-out')
  signOut(@Session() session: any) {
    session.userId = null

    return {}
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('handler is running')

    return this.usersService.findOne(parseInt(id))
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
