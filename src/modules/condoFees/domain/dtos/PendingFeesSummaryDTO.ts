import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class PendingFeesSummaryDTO {
  @ApiProperty()
  hasPending!: boolean;

  @ApiProperty()
  count!: number;

  @ApiProperty()
  total!: number;
}

