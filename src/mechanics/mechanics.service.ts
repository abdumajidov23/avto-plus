import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { Mechanic } from './entities/mechanic.entity';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { AdminSelfGuard } from '../guards/admin-self.guard';

@Injectable()
export class MechanicService {
  constructor(
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
  ) {}

  async create(createMechanicDto: CreateMechanicDto): Promise<Mechanic> {
    // Yangi mexanik yaratish
    const mechanic = this.mechanicRepository.create(createMechanicDto);
    return await this.mechanicRepository.save(mechanic);
  }

  async findAll(): Promise<Mechanic[]> {
    return await this.mechanicRepository.find({
      relations: ['mechanicSkills', 'mechanicSkills.skill', 'orders'], // Nested relation for mechanicSkills.skill
    });
  }
  @UseGuards( AdminSelfGuard)
  async findOne(id: string): Promise<Mechanic> {
    return await this.mechanicRepository.findOne({
      where: { id },
      relations: ['mechanicSkills', 'mechanicSkills.skill'], // Nested relation for mechanicSkills.skill
    });
  }

  async findMechanicByEmail(email: string): Promise<Mechanic> {
    const admin = await this.mechanicRepository.findOneBy({ login: email });
    return admin;
  }

  async update(
    id: string,
    updateMechanicDto: UpdateMechanicDto,
  ): Promise<Mechanic> {
    await this.mechanicRepository.update(id, updateMechanicDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.mechanicRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }
  }

  async activateMechanic(activationLink: string): Promise<Mechanic | null> {
    const mechanic = await this.mechanicRepository.findOne({
      where: { activation_link: activationLink },
    });
    if (!mechanic) {
      return null;
    }
    mechanic.is_active = true;
    await this.mechanicRepository.save(mechanic);
    return mechanic;
  }



}
