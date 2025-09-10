import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsNumber()
  apartmentId!: number;
}
