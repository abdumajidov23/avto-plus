import { IsNotEmpty, IsString, IsBoolean, IsNumberString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  
  @ApiProperty({ description: 'To\'lov miqdori', example: '1000' })
  @IsNotEmpty({ message: 'Miqdorni kiritish majburiy' })
  @IsNumberString({}, { message: 'Miqdor faqat raqam bo\'lishi kerak' })
  amount: string;

  @ApiProperty({ description: 'To\'lov sanasi', example: '2024-11-07' })
  @IsNotEmpty({ message: 'Sanani kiritish majburiy' })
  @IsDateString({}, { message: 'To\'lov sanasi noto\'g\'ri formatda' })
  date: string;

  @ApiProperty({ description: 'To\'lov usuli', example: 'Naqd' })
  @IsNotEmpty({ message: 'To\'lov usulini tanlang' })
  @IsString({ message: 'To\'lov usuli faqat matn bo\'lishi kerak' })
  method: string;

  @ApiProperty({ description: 'To\'lov holati', example: true })
  @IsNotEmpty({ message: 'To\'lov holatini belgilash majburiy' })
  @IsBoolean({ message: 'To\'lov holati faqat true yoki false bo\'lishi kerak' })
  status: boolean;
}
