import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    private user: UsersService,
  ) {}

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
}
