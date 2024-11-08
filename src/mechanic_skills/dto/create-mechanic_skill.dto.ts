// src/mechanic-skills/dto/create-mechanic-skill.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateMechanicSkillDto {
    @IsNotEmpty({ message: "Mexanik ID bo'sh bo'lishi mumkin emas." })
    mechanic_id: string;

    @IsNotEmpty({ message: "Ko'nikma ID bo'sh bo'lishi mumkin emas." })
    skill_id: string;
}
