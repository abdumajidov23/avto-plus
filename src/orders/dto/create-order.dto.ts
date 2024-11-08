import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Buyurtma miqdori',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty({
    description: 'Buyurtma holati',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Jami narxi',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  total_price: string;

  @ApiProperty({
    description: 'Buyurtma sanasi',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Usta identifikatori (ixtiyoriy)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  mechanic_id?: string;

  @ApiProperty({
    description: 'Maqsadli avtomobil identifikatori',
    type: Number,
  })
  @IsNumber()
  car_id: number;

  @ApiProperty({
    description: 'Xizmat identifikatori',
    type: Number,
  })
  @IsNumber()
  service_id: number;
}
