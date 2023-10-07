import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getCustomers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `orders limit: ${limit} y offset ${offset}`;
  }

  @Get(':orderId')
  getCustomer(@Param('orderId') orderId: string) {
    return `get order: ${orderId}`;
  }

  @Put(':orderId')
  updateCustomer(@Param('orderId') orderId: string) {
    return `put order: ${orderId}`;
  }

  @Delete(':orderId')
  deleteCustomer(@Param('orderId') orderId: string) {
    return `delete order: ${orderId}`;
  }
}
