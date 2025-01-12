import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

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
}
