import { IsEnum, IsPositive } from 'class-validator';

import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';
import { StatusRequestTypeEnum } from '../enums/status-request-type.enum';

export class UpdateStatusRequestDTO {
  @ApiProperty({ enum: StatusRequestTypeEnum })
  @IsEnum(StatusRequestTypeEnum)
  status!: StatusRequestTypeEnum;

  @ApiProperty()
  @IsPositive()
  id!: number;
}
