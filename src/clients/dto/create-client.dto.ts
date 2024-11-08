import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The phone number of the client',
    example: '+1234567890',
  })
  @IsPhoneNumber(null) // Optional: Can be set to a country code, e.g. 'US'
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'The email of the client',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the client',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The password confirmation of the client',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    description: 'The address of the client',
    example: '123 Main St, Springfield, IL',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The login username of the client',
    example: 'john_doe123',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  // Removed hashed_refresh_token, hashed_password, and activation_link since they will be generated in the service layer
  @IsOptional() 
  @IsString()
  hashed_refresh_token?: string;

  @IsOptional()
  @IsString()
  hashed_password?: string;

  @IsOptional()
  @IsString()
  activation_link?: string;

  @IsOptional()
  is_active?: boolean;

}
