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
import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  FilterUsersDto,
  GetUserByEmailDto,
  UpdateUserDto,
} from '../dtos/users.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAll(@Query() params: FilterUsersDto) {
    return this.usersService.findAll(params);
  }

  @Post()
  createOne(@Body() body: CreateUserDto) {
    console.log(body);
    return this.usersService.create(body);
  }

  @Get('/email')
  getByEmail(@Body() body: GetUserByEmailDto) {
    return this.usersService.findByEmail(body.email);
  }

  @Get(':userId')
  getOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Put(':userId')
  updateOne(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateOne(userId, body);
  }

  @Delete(':userId')
  deleteOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.deleteOne(userId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
