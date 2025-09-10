import { IsString } from 'class-validator';

export class CreateApartmentDTO {
  @IsString()
  number!: string;
}
