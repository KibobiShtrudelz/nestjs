import { Post, Body, Controller } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }
}
