import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class ApproveExpenseResponseDTO {
  @ApiProperty()
  approvals!: number;
}

