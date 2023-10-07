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
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAll(@Query('offset') offset, @Query('limit') limit) {
    return this.productsService.findAll(Number(offset), Number(limit));
  }

  @Post()
  createOne(@Body() body) {
    return this.productsService.create(body);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }

  @Get(':productId')
  getOne(@Param('productId') productId: number) {
    return this.productsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(@Param('productId') productId: number, @Body() body: any) {
    return this.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId') productId: number) {
    return this.deleteOne(productId);
  }
}
