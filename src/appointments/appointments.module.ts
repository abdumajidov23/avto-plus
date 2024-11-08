import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentController } from './appointments.controller';
import { AppointmentService } from './appointments.service';
import { ClientModule } from '../clients/clients.module';
import { ServicesModule } from '../services/services.module';
import { Client } from '../clients/entities/client.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Client, Service]),
    // ClientModule,ServicesModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentsModule {}
