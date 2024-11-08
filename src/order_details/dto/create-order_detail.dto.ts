import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Buyurtma IDsi',
    type: Number,
    example: 1,
  })
  order_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Qism IDsi',
    type: Number,
    example: 2,
  })
  part_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Miqdori',
    type: Number,
    example: 5,
  })
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Jami narx',
    type: Number,
    example: 1000,
  })
  total_price: number;
}
