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
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({ description: 'Lista de usuarios' })
  getAll(@Query('offset') offset, @Query('limit') limit) {
    return this.usersService.findAll(Number(offset), Number(limit));
  }

  @Post()
  createOne(@Body() body: CreateUserDto) {
    console.log(body);
    return this.usersService.create(body);
  }

  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Put(':userId')
  updateOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.updateOne(userId, body);
  }

  @Delete(':userId')
  deleteOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.deleteOne(userId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
