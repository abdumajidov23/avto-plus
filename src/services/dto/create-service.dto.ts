import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty({ description: 'Xizmatning nomi', example: 'Avtomobilni yuvish' })
    @IsNotEmpty({ message: 'Xizmat nomi bo\'sh bo\'lmasligi kerak' })
    name: string;

    @ApiProperty({ description: 'Xizmat tavsifi', example: 'Avtomobilni tozalash va yuvish' })
    @IsNotEmpty({ message: 'Xizmat tavsifi bo\'sh bo\'lmasligi kerak' })
    description: string;

    @ApiProperty({ description: 'Xizmat narxi', example: 15000 })
    @IsNotEmpty({ message: 'Narx bo\'sh bo\'lmasligi kerak' })
    @IsNumber({}, { message: 'Narx raqam bo\'lishi kerak' })
    price: string; // Narxni raqam sifatida saqlaymiz
}


