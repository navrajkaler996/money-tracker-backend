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
import { CreateTransactionDto } from './dto/create-transaction-dto';

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

  //Find transactions using userid and categoryid
  @Get('fetch/:userId/:categoryId')
  async findByCategoryId(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      return await this.transactionsService.findByCategoryId(
        +userId,
        +categoryId,
      );
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }

  @Post('create/:userId')
  async createTransaction(
    @Param('userId') userId: string,
    @Body() transactionData: CreateTransactionDto,
  ) {
    try {
      return await this.transactionsService.createTransaction(
        +userId,
        transactionData,
      );
    } catch (error) {
      throw new Error(`Error creating transaction: ${error.message}`);
    }
  }
}
