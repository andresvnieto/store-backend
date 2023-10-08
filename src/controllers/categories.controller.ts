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

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return { message: `categories limit: ${limit} y offset ${offset}` };
  }

  @Post()
  createOne(@Body() body) {
    return {
      message: 'Accion de crear',
      body,
    };
  }

  @Get(':categoryId')
  getCategory(@Param('categoryId') categoryId: string) {
    return { message: `get category: ${categoryId}` };
  }

  @Put(':categoryId')
  updateCategory(@Param('categoryId') categoryId: string, @Body() body: any) {
    return {
      message: `put category: ${categoryId}`,
      body,
    };
  }

  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    return { message: `delete category: ${categoryId}` };
  }
}
