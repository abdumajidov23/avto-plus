import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { MechanicSkillsService } from './mechanic_skills.service';
import { CreateMechanicSkillDto } from './dto/create-mechanic_skill.dto';
import { MechanicSkill } from './entities/mechanic_skill.entity';
import { UpdateMechanicSkillDto } from './dto/update-mechanic_skill.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Mexanik Ko\'nikmalari')
@Controller('mechanic-skills')
export class MechanicSkillsController {
    constructor(private readonly mechanicSkillsService: MechanicSkillsService) {}

    @Post()
    @ApiOperation({ summary: 'Yangi mexanik ko\'nikma yaratish' })
    @ApiBody({ type: CreateMechanicSkillDto, description: 'Yangi mexanik ko\'nikma yaratish uchun ma\'lumotlar' })
    @ApiResponse({ status: 201, description: 'Mexanik ko\'nikma muvaffaqiyatli yaratildi.' })
    async create(@Body() createMechanicSkillDto: CreateMechanicSkillDto): Promise<MechanicSkill> {
        return this.mechanicSkillsService.create(createMechanicSkillDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha mexanik ko\'nikmalarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha mexanik ko\'nikmalar muvaffaqiyatli olindi.' })
    async findAll(): Promise<MechanicSkill[]> {
        return this.mechanicSkillsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ID bo\'yicha mexanik ko\'nikma olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Mexanik ko\'nikma IDsi' })
    @ApiResponse({ status: 200, description: 'Mexanik ko\'nikma muvaffaqiyatli olindi.' })
    @ApiResponse({ status: 404, description: 'Mexanik ko\'nikma topilmadi' })
    findOne(@Param('id') id: string) {
        return this.mechanicSkillsService.findOne(Number(id)); // `id` ni `number` ga aylantirish
    }

    @Put(':id')
    @ApiOperation({ summary: 'ID bo\'yicha mexanik ko\'nikmani yangilash' })
    @ApiParam({ name: 'id', type: Number, description: 'Mexanik ko\'nikma IDsi' })
    @ApiBody({ type: UpdateMechanicSkillDto, description: 'Mexanik ko\'nikma yangilash uchun ma\'lumotlar' })
    @ApiResponse({ status: 200, description: 'Mexanik ko\'nikma muvaffaqiyatli yangilandi.' })
    @ApiResponse({ status: 404, description: 'Mexanik ko\'nikma topilmadi' })
    update(@Param('id') id: string, @Body() updateMechanicSkillDto: UpdateMechanicSkillDto) {
        return this.mechanicSkillsService.update(Number(id), updateMechanicSkillDto); // `id` ni `number` ga aylantirish
    }

    @Delete(':id')
    @ApiOperation({ summary: 'ID bo\'yicha mexanik ko\'nikmani o\'chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Mexanik ko\'nikma IDsi' })
    @ApiResponse({ status: 200, description: 'Mexanik ko\'nikma muvaffaqiyatli o\'chirildi.' })
    @ApiResponse({ status: 404, description: 'Mexanik ko\'nikma topilmadi' })
    remove(@Param('id') id: string) {
        return this.mechanicSkillsService.remove(Number(id)); // `id` ni `number` ga aylantirish
    }
}
