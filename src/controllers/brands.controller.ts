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
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { BrandsService } from 'src/services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get()
  getAll(@Query('offset') offset, @Query('limit') limit) {
    return this.brandsService.findAll(Number(offset), Number(limit));
  }

  @Post()
  createOne(@Body() body: CreateBrandDto) {
    console.log(body);
    return this.brandsService.create(body);
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.brandsService.findOne(productId);
  }

  @Put(':productId')
  updateOne(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() body: UpdateBrandDto,
  ) {
    return this.updateOne(productId, body);
  }

  @Delete(':productId')
  deleteOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.deleteOne(productId);
  }

  @Get('/filter')
  filter() {
    return {
      message: 'Soy un filter',
    };
  }
}
