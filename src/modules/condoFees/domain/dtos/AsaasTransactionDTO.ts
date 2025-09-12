import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class AsaasTransactionDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty({ required: false })
  description?: string;
}

