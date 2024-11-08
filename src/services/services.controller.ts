import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Xizmatlar')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @ApiOperation({ summary: 'Yangi xizmat yaratish' })
    @ApiResponse({ status: 201, description: 'Xizmat muvaffaqiyatli yaratildi.' })
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha xizmatlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha xizmatlar muvaffaqiyatli olishdi.' })
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ID bo\'yicha xizmatni olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Xizmat IDsi' })
    @ApiResponse({ status: 200, description: 'Xizmat muvaffaqiyatli olindi.' })
    @ApiResponse({ status: 404, description: 'Xizmat topilmadi' })
    findOne(@Param('id') id: number) {
        return this.servicesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'ID bo\'yicha xizmatni yangilash' })
    @ApiParam({ name: 'id', type: Number, description: 'Xizmat IDsi' })
    @ApiResponse({ status: 200, description: 'Xizmat muvaffaqiyatli yangilandi.' })
    @ApiResponse({ status: 404, description: 'Xizmat topilmadi' })
    update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'ID bo\'yicha xizmatni o\'chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Xizmat IDsi' })
    @ApiResponse({ status: 200, description: 'Xizmat muvaffaqiyatli o\'chirildi.' })
    @ApiResponse({ status: 404, description: 'Xizmat topilmadi' })
    remove(@Param('id') id: number) {
        return this.servicesService.remove(id);
    }
}
