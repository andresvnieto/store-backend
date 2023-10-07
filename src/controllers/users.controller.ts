import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `users limit: ${limit} y offset ${offset}`;
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return `get user: ${userId}`;
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string) {
    return `put user: ${userId}`;
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return `delete user: ${userId}`;
  }
}
