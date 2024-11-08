import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MechanicSkill } from './entities/mechanic_skill.entity';
import { CreateMechanicSkillDto } from './dto/create-mechanic_skill.dto';
import { UpdateMechanicSkillDto } from './dto/update-mechanic_skill.dto';


@Injectable()
export class MechanicSkillsService {
    constructor(
        @InjectRepository(MechanicSkill)
        private mechanicSkillRepository: Repository<MechanicSkill>,
    ) {}

    async create(createMechanicSkillDto: CreateMechanicSkillDto): Promise<MechanicSkill> {
        const mechanicSkill = this.mechanicSkillRepository.create(createMechanicSkillDto);
        return await this.mechanicSkillRepository.save(mechanicSkill);
    }

    async findAll(): Promise<MechanicSkill[]> {
        return await this.mechanicSkillRepository.find();
    }

    async findOne(id: number): Promise<MechanicSkill> { // `id` ni `number` ga o'zgartirish
        return await this.mechanicSkillRepository.findOne({ where: { id } });
    }

    async update(id: number, updateMechanicSkillDto: UpdateMechanicSkillDto): Promise<MechanicSkill> {
        await this.mechanicSkillRepository.update(id, updateMechanicSkillDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.mechanicSkillRepository.delete(id);
    }
}
