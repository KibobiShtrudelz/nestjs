import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  UseInterceptors
} from '@nestjs/common'

import { UserDto } from './dtos/user.dto'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Serialize } from '../interceptors/serializa.interceptopr'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password)
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
