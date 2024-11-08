// src/mechanic-skills/mechanic-skills.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MechanicSkill } from './entities/mechanic_skill.entity';
import { MechanicSkillsController } from './mechanic_skills.controller';
import { MechanicSkillsService } from './mechanic_skills.service';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MechanicSkill, Mechanic, Skill])], // Entity ni kiritamiz
    controllers: [MechanicSkillsController],
    providers: [MechanicSkillsService],
})
export class MechanicSkillsModule {}
