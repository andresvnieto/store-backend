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
  getOrders(@Query('limit') limit = 10, @Query('offset') offset = 0) {
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
  getOrder(@Param('orderId') orderId: string) {
    return { message: `get order: ${orderId}` };
  }

  @Put(':orderId')
  updateOrder(@Param('orderId') orderId: string, @Body() body: any) {
    return { message: `put order: ${orderId}`, body };
  }

  @Delete(':orderId')
  deleteOrder(@Param('orderId') orderId: string) {
    return { message: `delete order: ${orderId}` };
  }
}
