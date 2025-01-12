import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  //Find all categoriess
  findAll() {
    try {
      const categories = this.prisma.category.findMany();

      if (!categories) {
        throw new Error(`Categories noy found`);
      }
      return categories;
    } catch (error) {
      throw new Error(`Error fetching expense: ${error.message}`);
    }
  }
}
