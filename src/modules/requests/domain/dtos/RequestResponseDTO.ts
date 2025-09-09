import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';
import { StatusRequestTypeEnum } from '../enums/status-request-type.enum';
import { IsEnum } from 'class-validator';

export class RequestDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty({ enum: StatusRequestTypeEnum })
  @IsEnum(StatusRequestTypeEnum)
  status!: StatusRequestTypeEnum;
}
