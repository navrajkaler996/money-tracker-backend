import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  //Find all by transaction for a user
  /////using userId
  findByUserId(userId: number, month: number, year: number) {
    try {
      const transactions = this.prisma.ledger.findMany({
        where: {
          userId: Number(userId),
          AND: [
            {
              transaction_date: {
                gte: new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)),
              },
            },
            {
              transaction_date: {
                lt: new Date(Date.UTC(year, month, 0, 23, 59, 59)),
              },
            },
          ],
        },
      });

      if (!transactions) {
        throw new Error(`Transactions not found for userId ${userId}`);
      }

      return transactions;
    } catch (error) {
      throw new Error(`Error fetching expense: ${error.message}`);
    }
  }
}
