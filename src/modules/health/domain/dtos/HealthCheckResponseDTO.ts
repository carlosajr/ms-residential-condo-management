import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class HealthCheckResponseDTO {
  @ApiProperty()
  status!: string;
}

