import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    private user: UsersService,
  ) {}

  async fetchAccounts(userId: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });
      if (!userExists.id) {
        throw new Error(`No user exists with id ${userId}`);
      }

      const accounts = await this.prisma.account.findMany({
        where: {
          userId: Number(userId),
        },
      });

      if (accounts.length === 0) {
        return {
          message: `No accounts found for user with id ${userId}`,
          accounts: [],
        };
      }

      return accounts;
    } catch (error) {
      throw new Error(
        `An error occurred while fetching accounts: ${error.message}`,
      );
    }
  }

  //Insert accounts using user id
  async insertAccounts(userId: any, accounts: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!userExists.id) {
        throw new Error(`No user exists with id ${userId}`);
      }

      const accountsToInsert = accounts.map((account: any) => ({
        account_type: account.account_type,
        bank_name: account.bank_name,
        total_amount: account.total_amount,
        credit_limit: account.credit_limit,
        available_credit: account.available_credit,
        userId: Number(userId),
      }));

      const insertedAccounts = await this.prisma.account.createMany({
        data: accountsToInsert,
      });

      return {
        message: 'Accounts added successfully',
        insertedAccounts,
      };
    } catch (error) {
      throw new Error(
        `An error occurred while adding accounts: ${error.message}`,
      );
    }
  }

  //Updating account using account id
  async updateAccount(accountId: number, transaction: any) {
    try {
      const accountExists = await this.prisma.account.findUnique({
        where: { account_id: Number(accountId) },
      });

      if (!accountExists) {
        throw new Error(`No account exists with id ${accountId}`);
      }

      const accountType = accountExists?.account_type?.toLowerCase();

      if (accountType === 'cash' || accountType === 'debit') {
        const newTotalAmount =
          Number(accountExists.total_amount) -
          Number(transaction.transactionAmount);

        const updatedAccount = await this.prisma.account.update({
          where: {
            account_id: Number(accountId),
          },
          data: {
            total_amount: newTotalAmount,
          },
        });

        return { updatedAccount };
      }

      if (accountType === 'credit') {
        const creditLimit = accountExists.credit_limit;
        const availableCredit = accountExists.available_credit;

        const newAvailableCredit =
          Number(accountExists.available_credit) -
          Number(transaction.transactionAmount);
        const updatedAccount = await this.prisma.account.update({
          where: {
            account_id: Number(accountId),
          },
          data: {
            available_credit: newAvailableCredit,
          },
        });
        return { updatedAccount };
      }
    } catch (error) {
      throw new Error(
        `An error occurred while updating account: ${error.message}`,
      );
    }
  }
}
