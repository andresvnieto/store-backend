import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 20) {
    return { limit, offset };
  }

  @Get('/filter')
  getProductFilter() {
    return 'Soy un fliter';
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return { productId };
  }

  @Put(':productId')
  updateUser(@Param('productId') productId: string) {
    return `put product: ${productId}`;
  }

  @Delete(':productId')
  deleteUser(@Param('productId') productId: string) {
    return `delete product: ${productId}`;
  }
}
