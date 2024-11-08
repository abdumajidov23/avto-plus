import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AppointmentsModule } from '../appointments/appointments.module';
import { ClientRequest } from 'http';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),

  AppointmentsModule
],
  
  providers: [ClientService],
  controllers: [ClientsController],
  exports: [ClientService],
})
export class ClientModule {}
