import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private account: AccountsService,
  ) {}

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
        orderBy: {
          transaction_date: 'desc',
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

  //Create transaction for a using
  /////using userId
  async createTransaction(userId: number, transaction: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!userExists.id) {
        throw new Error(`No user exists with id ${userId}`);
      }

      const transactionToCreate = {
        ...transaction,
        userId,
        transaction_date: new Date().toISOString(),
      };

      const createdTransaction = await this.prisma.ledger.create({
        data: transactionToCreate,
      });

      const accountId = createdTransaction.account_id;
      const payload = {
        transactionAmount: createdTransaction.transaction_amount,
      };

      const updatedAccount = this.account.updateAccount(accountId, payload);

      return createdTransaction;
    } catch (error) {
      throw new Error(
        `An error occurred while creating transaction: ${error.message}`,
      );
    }
  }

  //Find all by transaction for a user
  /////using category id
  findByCategoryId(userId: number, categoryId: number) {
    try {
      const transactions = this.prisma.ledger.findMany({
        where: {
          userId: Number(userId),
          category_id: categoryId,
        },
        orderBy: {
          transaction_date: 'desc',
        },
      });

      if (!transactions) {
        throw new Error(`Transactions not found for categoryId ${categoryId}`);
      }

      return transactions;
    } catch (error) {
      throw new Error(`Error fetching expense: ${error.message}`);
    }
  }
}
