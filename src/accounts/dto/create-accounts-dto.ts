import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

// Enum for account types
export enum AccountType {
  credit = 'credit',
  debit = 'debit',
  cash = 'cash',
}

export class CreateAccountDto {
  @IsEnum(AccountType)
  account_type: AccountType;

  @IsOptional()
  @IsString()
  bank_name?: string;

  @IsInt()
  @Min(0)
  total_amount: number = 0;
}
