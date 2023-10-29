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
import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  FilterBrandsDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get()
  getAll(@Query() params: FilterBrandsDto) {
    return this.brandsService.findAll(params);
  }

  @Post()
  createOne(@Body() body: CreateBrandDto) {
    console.log(body);
    return this.brandsService.create(body);
  }

  @Get(':productId')
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.brandsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() body: UpdateBrandDto,
  ) {
    return this.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.deleteOne(productId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
