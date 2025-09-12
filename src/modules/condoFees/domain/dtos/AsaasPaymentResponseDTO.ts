import { ApiProperty } from '@/shared/http/docs/decorators/ApiProperty';

class PixQrCodeDTO {
  @ApiProperty()
  encodedImage!: string;

  @ApiProperty()
  payload!: string;
}

export class AsaasPaymentResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty({ required: false, type: PixQrCodeDTO })
  pixQrCode?: PixQrCodeDTO;
}

