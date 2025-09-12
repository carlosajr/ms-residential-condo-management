import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class ApartmentResponseDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  number!: string;
}

