import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(user: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExists?.email) {
        throw new Error(`User already exists with email ${user.email}`);
      }

      const newUser = this.prisma.user.create({ data: user });

      return newUser;
    } catch (error) {
      throw new Error(`Error creating new user: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
