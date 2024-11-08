import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartDto {
  
  @ApiProperty({ description: 'Qism nomi', example: 'Mashina Yoqilg\'i Filtri' })
  @IsString({ message: 'Nom faqat matn bo\'lishi kerak' })
  name: string;

  @ApiProperty({ description: 'Qism narxi', example: 1500 })
  @IsNumber({}, { message: 'Narx faqat raqam bo\'lishi kerak' })
  price: number;

  @ApiProperty({ description: 'Qism tavsifi', example: 'Yoqilg\'i filtri bilan ishlash uchun maxsus' })
  @IsString({ message: 'Tavsif faqat matn bo\'lishi kerak' })
  description: string;

  @ApiProperty({ description: 'Qismning mavjudligi (ombor miqdori)', example: 25 })
  @IsNumber({}, { message: 'Ombor miqdori faqat raqam bo\'lishi kerak' })
  stock: number;
}
