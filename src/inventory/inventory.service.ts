import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
    ) {}

    async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        const inventory = this.inventoryRepository.create(createInventoryDto);
        return this.inventoryRepository.save(inventory);
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    async findOne(id: number): Promise<Inventory> {
        return this.inventoryRepository.findOneBy({ id });
    }

    async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
        await this.inventoryRepository.update(id, updateInventoryDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.inventoryRepository.delete(id);
    }
}