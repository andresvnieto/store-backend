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

@Controller('orders')
export class OrdersController {
  @Get()
  getCustomers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `orders limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':orderId')
  getCustomer(@Param('orderId') orderId: string) {
    return { message: `get order: ${orderId}` };
  }

  @Put(':orderId')
  updateCustomer(@Param('orderId') orderId: string, @Body() body: any) {
    return { message: `put order: ${orderId}`, body };
  }

  @Delete(':orderId')
  deleteCustomer(@Param('orderId') orderId: string) {
    return { message: `delete order: ${orderId}` };
  }
}
