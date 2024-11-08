import { Module } from '@nestjs/common';
import { MechanicService } from './mechanics.service';
import { MechanicController } from './mechanics.controller';
import { Mechanic } from './entities/mechanic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MechanicSkill } from '../mechanic_skills/entities/mechanic_skill.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic , MechanicSkill])],
  controllers: [MechanicController],
  providers: [MechanicService],
  exports: [MechanicService],
  
})
export class MechanicsModule {}
