import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
    @IsNotEmpty()
    service_id: number;

    @IsNotEmpty()
    car_id: number;

    @IsNotEmpty()
    client_id: number;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    status: string;
}