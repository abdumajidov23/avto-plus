import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiPropertyOptional({ description: 'The ID of the client who owns the car' })
  @IsOptional()
  client_id?: number;

  @ApiPropertyOptional({ description: 'The make of the car' })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiPropertyOptional({ description: 'The model of the car' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ description: 'The year of manufacture of the car' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiPropertyOptional({ description: 'The license plate of the car' })
  @IsOptional()
  @IsString()
  license_plate?: string;

  @ApiPropertyOptional({ description: 'The current status of the car' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'The transmission type of the car' })
  @IsOptional()
  @IsString()
  transmission?: string;

  @ApiPropertyOptional({ description: 'The last service date of the car' })
  @IsOptional()
  @IsString()
  last_service_date?: string;

  @ApiPropertyOptional({ description: 'Any additional notes from the owner about the car' })
  @IsOptional()
  @IsString()
  owner_note?: string;

  @ApiPropertyOptional({ description: 'The insurance status of the car' })
  @IsOptional()
  @IsBoolean()
  insurance_status?: boolean;
}
