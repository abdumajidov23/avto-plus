import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto'; // DTO import
import { UpdatePartDto } from './dto/update-part.dto'; // DTO import

@Injectable()
export class PartsService {
    constructor(
        @InjectRepository(Part)
        private partsRepository: Repository<Part>,
    ) {}

    async create(createPartDto: CreatePartDto): Promise<Part> {
        const part = this.partsRepository.create(createPartDto);
        return this.partsRepository.save(part);
    }

    async findAll(): Promise<Part[]> {
        return this.partsRepository.find();
    }

    async findOne(id: number): Promise<Part> {
        return this.partsRepository.findOneBy({ id });
    }

    async update(id: number, updatePartDto: UpdatePartDto): Promise<Part> {
        await this.partsRepository.update(id, updatePartDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.partsRepository.delete(id);
    }
}
