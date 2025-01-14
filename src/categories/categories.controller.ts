import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-categories-dto';

@Controller('/api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //Find all categories
  @Get('')
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  //Insert categories using userid
  @Post(':userId')
  async insertCategories(
    @Param('userId') userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      return this.categoriesService.insertCategories(userId, createCategoryDto);
    } catch (error) {}
  }
}
