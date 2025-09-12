import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class AsaasBalanceDTO {
  @ApiProperty()
  balance!: number;
}

