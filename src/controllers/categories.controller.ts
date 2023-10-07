import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `category limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':categoryId')
  getUser(@Param('categoryId') categoryId: string) {
    return { mesaage: `get category: ${categoryId}` };
  }

  @Put(':categoryId')
  updateUser(@Param('categoryId') categoryId: string, @Body() body: any) {
    return { mesaage: `put category: ${categoryId}`, body };
  }

  @Delete(':categoryId')
  deleteUser(@Param('categoryId') categoryId: string) {
    return { mesaage: `delete category: ${categoryId}` };
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
