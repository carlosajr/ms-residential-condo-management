import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

export class UserResponseDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  isAdmin!: boolean;

  @ApiProperty()
  apartmentId!: number;
}

