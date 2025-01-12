import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('/api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':userId')
  async findByUserId(
    @Param('userId') userId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    try {
      return await this.transactionsService.findByUserId(
        +userId,
        month ? +month : undefined,
        year ? +year : undefined,
      );
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }
}
