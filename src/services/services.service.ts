import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {}

    create(createServiceDto: CreateServiceDto): Promise<Service> {
        const service = this.servicesRepository.create(createServiceDto);
        return this.servicesRepository.save(service);
    }

    findAll(): Promise<Service[]> {
        return this.servicesRepository.find();
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.servicesRepository.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
        await this.findOne(id); // Service mavjudligini tekshirish
        await this.servicesRepository.update(id, updateServiceDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const service = await this.findOne(id);
        await this.servicesRepository.remove(service);
    }
}
