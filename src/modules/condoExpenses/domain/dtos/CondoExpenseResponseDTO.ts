import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class CondoExpenseResponseDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  date!: Date;

  @ApiProperty({ required: false })
  receiptUrl?: string;

  @ApiProperty({ required: false })
  pixKey?: string;

  @ApiProperty()
  approvalsRequired!: number;

  @ApiProperty()
  paid!: boolean;

  @ApiProperty({ required: false })
  paidByUserId?: number;

  @ApiProperty({ required: false })
  paidByApartmentId?: number;
}

