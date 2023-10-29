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
  UpdateUserDto,
} from '../dtos/users.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
@Controller('products')
export class UsersController {
  constructor(private readonly productsService: UsersService) {}
  @Get()
  getAll(@Query() params: FilterUsersDto) {
    return this.productsService.findAll(params);
  }

  @Post()
  createOne(@Body() body: CreateUserDto) {
    console.log(body);
    return this.productsService.create(body);
  }

  @Get(':productId')
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.productsService.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.deleteOne(productId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
