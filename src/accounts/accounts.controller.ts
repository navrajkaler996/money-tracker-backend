import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-accounts-dto';
import { UpdateAccountDto } from './dto/update-account-dto';

@Controller('/api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('fetch/:userId')
  async fetchAccounts(@Param('userId') userId: string) {
    try {
      return this.accountsService.fetchAccounts(userId);
    } catch (error) {}
  }

  //Insert accounts using user id
  @Post('insert/:userId')
  async insertAccounts(
    @Param('userId') userId: string,
    @Body() accounts: CreateAccountDto,
  ) {
    try {
      return this.accountsService.insertAccounts(userId, accounts);
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }

  @Patch('update/:account_id')
  async updateAccount(
    @Param('account_id') account_id: number,
    @Body() transaction: UpdateAccountDto,
  ) {
    try {
      return this.accountsService.updateAccount(account_id, transaction);
    } catch (error) {
      throw new Error(`Error while updating account: ${error.message}`);
    }
  }
}
