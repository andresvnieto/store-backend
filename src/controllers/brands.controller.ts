import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `brands limit: ${limit} y offset ${offset}`;
  }

  @Get(':brandId')
  getBrand(@Param('brandId') brandId: string) {
    return `get brand: ${brandId}`;
  }

  @Put(':brandId')
  updateBrand(@Param('brandId') brandId: string) {
    return `put brand: ${brandId}`;
  }

  @Delete(':brandId')
  deleteBrand(@Param('brandId') brandId: string) {
    return `delete brand: ${brandId}`;
  }
}
