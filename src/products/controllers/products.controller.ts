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
// import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAll(@Query('offset') offset, @Query('limit') limit) {
    return this.productsService.findAll(Number(offset), Number(limit));
  }

  @Post()
  createOne(@Body() body: CreateProductDto) {
    console.log(body);
    return this.productsService.create(body);
  }

  @Get(':productId')
  getOne(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId') productId: string) {
    return this.deleteOne(productId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
