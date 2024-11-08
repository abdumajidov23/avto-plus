import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateMechanicSkillDto } from './create-mechanic_skill.dto';

export class UpdateMechanicSkillDto extends PartialType(CreateMechanicSkillDto) {
    @ApiPropertyOptional({
        description: 'ID of the mechanic',
        example: '123',
    })
    mechanic_id?: string;

    @ApiPropertyOptional({
        description: 'ID of the skill',
        example: '456',
    })
    skill_id?: string;
}
