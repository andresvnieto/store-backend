import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `customers limit: ${limit} y offset ${offset}`;
  }

  @Get(':customerId')
  getCustomer(@Param('customerId') customerId: string) {
    return `get customer: ${customerId}`;
  }

  @Put(':customerId')
  updateCustomer(@Param('customerId') customerId: string) {
    return `put customer: ${customerId}`;
  }

  @Delete(':customerId')
  deleteCustomer(@Param('customerId') customerId: string) {
    return `delete customer: ${customerId}`;
  }
}
