import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateAccountDto {
  @IsInt()
  @Min(0)
  transaction_amount: number = 0;
}
