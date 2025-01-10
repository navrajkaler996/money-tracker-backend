import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  //Find expense by user Id
  findByUserId(id: number) {
    try {
      const expense = this.prisma.expense.findFirst({
        where: { userId: Number(id) },
      });

      if (!expense) {
        throw new Error(`Expense not found for userId ${id}`);
      }

      return expense;
    } catch (error) {
      throw new Error(`Error fetching expense: ${error.message}`);
    }
  }

  // create(createExpenseDto: CreateExpenseDto) {
  //   return 'This action adds a new expense';
  // }

  // findAll() {
  //   return `This action returns all expenses`;
  // }

  // update(id: number, updateExpenseDto: UpdateExpenseDto) {
  //   return `This action updates a #${id} expense`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} expense`;
  // }
}
