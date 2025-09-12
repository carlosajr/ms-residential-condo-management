import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class MessageResponseDTO {
  @ApiProperty()
  message!: string;
}

