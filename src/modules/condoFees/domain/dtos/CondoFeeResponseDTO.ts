import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';
import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';

export class CondoFeeResponseDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  month!: number;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ enum: FeeStatusEnum })
  status!: FeeStatusEnum;

  @ApiProperty({ required: false })
  asaasPaymentId?: string;

  @ApiProperty({ required: false })
  externalReference?: string;

  @ApiProperty()
  dueDate!: Date;

  @ApiProperty()
  apartmentId!: number;
}

