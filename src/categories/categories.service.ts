import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private user: UsersService,
  ) {}

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
  //Insert categories using userid
  async insertCategories(userId: any, categories: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!userExists.id) {
        throw new Error(`No user exists with id ${userId}`);
      }

      const categoriesToInsert = categories.map((category_name: string) => ({
        category_name: category_name,
        userId: Number(userId),
      }));

      const insertedCategories = await this.prisma.category.createMany({
        data: categoriesToInsert,
      });

      return {
        message: 'Categories added successfully',
        insertedCategories,
      };
    } catch (error) {
      throw new Error(
        `An error occurred while adding categories: ${error.message}`,
      );
    }
  }
}
