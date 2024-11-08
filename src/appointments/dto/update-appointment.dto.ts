import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsString } from 'class-validator';

export class UpdateAppointmentDto {
    serviceId?: number;
    carId?: number;
    clientId?: number;
    @IsString()
    date?: string;
    @IsString()
    status?: string;
}