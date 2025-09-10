import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDTO {
  @IsString()
  description!: string;

  @IsNumber()
  value!: number;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @IsOptional()
  @IsString()
  pixKey?: string;

  @IsNumber()
  approvalsRequired!: number;
}
