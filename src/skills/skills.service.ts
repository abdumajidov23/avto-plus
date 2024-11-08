import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>,
    ) {}

    async create(createSkillDto: CreateSkillDto): Promise<Skill> {
        const skill = this.skillRepository.create(createSkillDto);
        return await this.skillRepository.save(skill);
    }

    async findAll(): Promise<Skill[]> {
        return await this.skillRepository.find();
    }

    async findOne(id: number): Promise<Skill> { // `id` ni `number` ga o'zgartirish
        return await this.skillRepository.findOne({ where: { id } });
    }

    async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
        await this.skillRepository.update(id, updateSkillDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.skillRepository.delete(id);
    }
}
