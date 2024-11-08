import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from './entities/part.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Qismlar')
@Controller('parts')
export class PartsController {
    constructor(private readonly partsService: PartsService) {}

    @Post('create')
    @ApiOperation({ summary: 'Yangi qism yaratish' })
    @ApiResponse({ status: 201, description: 'Qism muvaffaqiyatli yaratildi.' })
    create(@Body() createPartDto: CreatePartDto) {
        return this.partsService.create(createPartDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha qismlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha qismlar muvaffaqiyatli olindi.' })
    findAll() {
        return this.partsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ID bo\'yicha qismni olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Qism IDsi' })
    @ApiResponse({ status: 200, description: 'Qism muvaffaqiyatli olindi.' })
    @ApiResponse({ status: 404, description: 'Qism topilmadi' })
    findOne(@Param('id') id: number) {
        return this.partsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'ID bo\'yicha qismni yangilash' })
    @ApiParam({ name: 'id', type: Number, description: 'Qism IDsi' })
    @ApiResponse({ status: 200, description: 'Qism muvaffaqiyatli yangilandi.' })
    @ApiResponse({ status: 404, description: 'Qism topilmadi' })
    update(@Param('id') id: number, @Body() updatePartDto: UpdatePartDto) {
        return this.partsService.update(id, updatePartDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'ID bo\'yicha qismni o\'chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Qism IDsi' })
    @ApiResponse({ status: 200, description: 'Qism muvaffaqiyatli o\'chirildi.' })
    @ApiResponse({ status: 404, description: 'Qism topilmadi' })
    remove(@Param('id') id: number) {
        return this.partsService.remove(id);
    }
}
