import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class PayFeesDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  feeIds!: number[];
}
