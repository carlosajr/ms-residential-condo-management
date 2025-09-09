import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class CreateRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  description!: string;
}
