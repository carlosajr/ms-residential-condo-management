import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class LoginResponseDTO {
  @ApiProperty()
  token!: string;
}

