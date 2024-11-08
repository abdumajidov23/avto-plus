import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    description: 'The updated phone number of the client (optional)',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null) // Specify a country code if needed, e.g., 'US'
  @IsNotEmpty()
  phone_number?: string;

  @ApiProperty({
    description: 'The updated email of the client (optional)',
    example: 'johndoe_updated@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'The updated address of the client (optional)',
    example: '456 Elm St, Springfield, IL',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiProperty({
    description: 'The updated login username of the client (optional)',
    example: 'john_doe_updated',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  login?: string;

  @ApiProperty({
    description: 'The updated hashed refresh token of the client (optional)',
    example: 'updatedhashedtoken123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  hashed_refresh_token?: string;

  @ApiProperty({
    description: 'The updated hashed password of the client (optional)',
    example: 'updatedhashedpassword123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  hashed_password?: string;
}
