import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Taqdimotlar')
@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    @ApiOperation({ summary: 'Yangi taqdimotni yaratish' })
    @ApiResponse({ status: 201, description: 'Taqdimot muvaffaqiyatli yaratildi.' })
    async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        return this.appointmentService.createAppointment(createAppointmentDto);
    }

    @Get('get')
    @ApiOperation({ summary: 'Barcha taqdimotlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha taqdimotlar muvaffaqiyatli olindi.' })
    async findAll(): Promise<Appointment[]> {
        return this.appointmentService.getAllAppointments();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ID bo\'yicha taqdimotni olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Taqdimot IDsi' })
    @ApiResponse({ status: 200, description: 'Taqdimot muvaffaqiyatli olindi.' })
    @ApiResponse({ status: 404, description: 'Taqdimot topilmadi' })
    async findOne(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.getAppointmentById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'ID bo\'yicha taqdimotni yangilash' })
    @ApiParam({ name: 'id', type: Number, description: 'Taqdimot IDsi' })
    @ApiResponse({ status: 200, description: 'Taqdimot muvaffaqiyatli yangilandi.' })
    @ApiResponse({ status: 404, description: 'Taqdimot topilmadi' })
    async update(@Param('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        return this.appointmentService.updateAppointment(id, updateAppointmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'ID bo\'yicha taqdimotni o\'chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Taqdimot IDsi' })
    @ApiResponse({ status: 200, description: 'Taqdimot muvaffaqiyatli o\'chirildi.' })
    @ApiResponse({ status: 404, description: 'Taqdimot topilmadi' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.appointmentService.deleteAppointment(id);
    }
}
