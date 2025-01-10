import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('/api/v1/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // @Post()
  // create(@Body() createExpenseDto: CreateExpenseDto) {
  //   return this.expensesService.create(createExpenseDto);
  // }

  @Get()
  findAll() {
    return 'asasa';
  }
  //Find expense by user id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findByUserId(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
  //   return this.expensesService.update(+id, updateExpenseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.expensesService.remove(+id);
  // }
}
