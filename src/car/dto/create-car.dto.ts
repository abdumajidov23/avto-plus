import { IsNotEmpty, IsBoolean, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'The ID of the client who owns the car' })
  @IsInt()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({ description: 'The make of the car' })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({ description: 'The model of the car' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'The year of manufacture of the car' })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({ description: 'The license plate of the car' })
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @ApiProperty({ description: 'The current status of the car' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'The transmission type of the car' })
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({ description: 'The last service date of the car' })
  @IsString()
  @IsNotEmpty()
  last_service_date: string;

  @ApiProperty({ description: 'Any additional notes from the owner about the car' })
  @IsString()
  @IsNotEmpty()
  owner_note: string;

  @ApiProperty({ description: 'The insurance status of the car' })
  @IsBoolean()
  @IsNotEmpty()
  insurance_status: boolean;
}
