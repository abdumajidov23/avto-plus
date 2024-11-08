import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  Matches,
  isString,
  isEmail,
  IsOptional,
} from 'class-validator';

export class CreateMechanicDto {
  @ApiProperty({ description: 'The name of the mechanic', example: 'Ali' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone number of the mechanic (Uzbek format)',
    example: '+998901234567',
  })
  @IsString()
  @Matches(/^\+998[0-9]{9}$/, {
    message:
      'Phone number must be a valid Uzbek phone number, starting with +998',
  })
  phone_number: string;

  @ApiProperty({
    description: 'The specialization of the mechanic',
    example: 'Sartarosh',
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    description: 'The proficiency level of the mechanic',
    example: 'Expert',
  })
  @IsString()
  proficiency_level: string;

  @ApiProperty({
    description: 'The login identifier for the mechanic',
    example: 'ali123',
  })
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  creator: string;

  @IsString()
  confirm_password: string;

  @IsOptional()
  hashed_refresh_token?: string;

  @IsOptional()
  hashed_password: string;
}
