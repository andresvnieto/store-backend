import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `customers limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':customerId')
  getCustomer(@Param('customerId') customerId: string) {
    return { message: `get customer: ${customerId}` };
  }

  @Put(':customerId')
  updateCustomer(@Param('customerId') customerId: string, @Body() body: any) {
    return { message: `put customer: ${customerId}`, body };
  }

  @Delete(':customerId')
  deleteCustomer(@Param('customerId') customerId: string) {
    return { message: `delete customer: ${customerId}` };
  }
}
