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
import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CustomersService } from '../services/customers.service';
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  getAll(@Query() params: FilterCustomersDto) {
    return this.customersService.findAll(params);
  }

  @Post()
  createOne(@Body() body: CreateCustomerDto) {
    return this.customersService.create(body);
  }

  @Get(':userId')
  getOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.customersService.findOne(userId);
  }

  @Put(':userId')
  updateOne(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return this.customersService.updateOne(userId, body);
  }

  @Delete(':userId')
  deleteOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.customersService.deleteOne(userId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
