import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `users limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return { message: `get user: ${userId}` };
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() body: any) {
    return {
      message: `put user: ${userId}`,
      body,
    };
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return { message: `delete user: ${userId}` };
  }
}
