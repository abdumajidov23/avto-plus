import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMechanicDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  proficiency_level?: string;

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  creator?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  confirm_password?: string;

  @IsOptional()
  hashed_refresh_token?: string;

  @IsOptional()
  hashed_password?: string;

  @IsOptional()
  activation_link?: string;
}
