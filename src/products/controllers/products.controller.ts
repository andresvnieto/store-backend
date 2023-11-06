import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Roles(Role.ADMIN)
  @Post()
  createOne(@Body() body: CreateProductDto) {
    console.log(body);
    return this.productsService.create(body);
  }

  @Get(':productId')
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.deleteOne(productId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
