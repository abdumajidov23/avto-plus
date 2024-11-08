import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto {
    @ApiProperty({
        description: 'Ko’nikmaning nomi',
        example: 'Avtomobilni ta’mirlash',
    })
    @IsNotEmpty({ message: 'Ko’nikmaning nomi bo’sh bo’lmasligi kerak' })
    name: string;

    @ApiProperty({
        description: 'Ko’nikma haqida qisqacha tavsif',
        example: 'Turli avtomobillar va dvigatellarni ta’mirlashda malaka.',
    })
    @IsNotEmpty({ message: 'Ko’nikma tavsifi bo’sh bo’lmasligi kerak' })
    description: string;
}
