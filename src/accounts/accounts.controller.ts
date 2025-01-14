import { Body, Controller, Param, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-accounts-dto';

@Controller('/api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  //Insert accounts using user id
  @Post(':userId')
  async insertAccounts(
    @Param('userId') userId: string,
    @Body() accounts: CreateAccountDto,
  ) {
    try {
      return this.accountsService.insertAccounts(userId, accounts);
    } catch (error) {}
  }
}
