import { IsNumber } from 'class-validator';

export class GenerateFeesDTO {
  @IsNumber()
  year!: number;

  @IsNumber()
  amount!: number;
}
