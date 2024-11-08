import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) {}


async createAppointment(appointmentData: CreateAppointmentDto) {
  const client = await this.clientRepository.findOne({where: {id : appointmentData.car_id}});
  if (!client) {
    throw new Error('Client not found');
  }
  // Repeat similar checks for other foreign key fields if needed
  const appointment = this.appointmentRepository.create(appointmentData);
  return await this.appointmentRepository.save(appointment);
}


    async getAllAppointments(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({ relations: ['service', 'car', 'client'] });
    }

    async getAppointmentById(id: number): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['service', 'car', 'client'],
        });
        if (!appointment) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }

    async updateAppointment(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        await this.appointmentRepository.update(id, updateAppointmentDto);
        return this.getAppointmentById(id);
    }

    async deleteAppointment(id: number): Promise<void> {
        const result = await this.appointmentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
}
