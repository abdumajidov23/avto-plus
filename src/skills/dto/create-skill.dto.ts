import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
    @ApiProperty({
        description: 'The name of the skill',
        example: 'Car Repair',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'A brief description of the skill',
        example: 'Skilled in repairing various types of cars and engines.',
    })
    @IsNotEmpty()
    description: string;
}
