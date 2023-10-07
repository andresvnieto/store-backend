import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `category limit: ${limit} y offset ${offset}`;
  }

  @Get(':categoryId')
  getUser(@Param('categoryId') categoryId: string) {
    return `get category: ${categoryId}`;
  }

  @Put(':categoryId')
  updateUser(@Param('categoryId') categoryId: string) {
    return `put category: ${categoryId}`;
  }

  @Delete(':categoryId')
  deleteUser(@Param('categoryId') categoryId: string) {
    return `delete category: ${categoryId}`;
  }

  @Get(':categoryId/products/:productId')
  getCategories(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return {
      categoryId,
      productId,
    };
  }
}
