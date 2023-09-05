import { Post, Body, Controller } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    console.log('body', body);
  }
}
