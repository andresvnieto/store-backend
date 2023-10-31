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
import { OrdersService } from '../services/orders.service';
import {
  AddProductsToOrder,
  CreateOrderDto,
  FilterOrdersDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get()
  getAll(@Query() params: FilterOrdersDto) {
    return this.ordersService.findAll(params);
  }

  @Post()
  createOne(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @Get(':orderId')
  getOne(@Param('orderId', MongoIdPipe) orderId: string) {
    return this.ordersService.findOne(orderId);
  }

  @Put(':orderId')
  updateOne(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    return this.ordersService.updateOne(orderId, body);
  }

  @Delete(':orderId')
  deleteOne(@Param('orderId', MongoIdPipe) orderId: string) {
    return this.ordersService.deleteOne(orderId);
  }

  @Delete(':orderId/product/:productId')
  deleteOneProduct(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(orderId, productId);
  }

  @Put(':orderId/products')
  addProducts(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() body: AddProductsToOrder,
  ) {
    return this.ordersService.addProducts(orderId, body);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
