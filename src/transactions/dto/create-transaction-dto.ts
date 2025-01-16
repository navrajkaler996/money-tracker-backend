import { IsInt, IsOptional, IsString, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @IsPositive()
  category_id: number;

  @IsInt()
  @IsPositive()
  transaction_amount: number;

  @IsInt()
  @IsPositive()
  account_id: number;

  @IsOptional()
  @IsString()
  description?: string;
}
