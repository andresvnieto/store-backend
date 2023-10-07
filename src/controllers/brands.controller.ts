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

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `brands limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':brandId')
  getBrand(@Param('brandId') brandId: string) {
    return { message: `get brand: ${brandId}` };
  }

  @Put(':brandId')
  updateBrand(@Param('brandId') brandId: string, @Body() body: any) {
    return { message: `put brand: ${brandId}`, body };
  }

  @Delete(':brandId')
  deleteBrand(@Param('brandId') brandId: string) {
    return { mesaage: `delete brand: ${brandId}` };
  }
}
