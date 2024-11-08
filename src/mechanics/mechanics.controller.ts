import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { MechanicService } from './mechanics.service';
import { Mechanic } from './entities/mechanic.entity';

@ApiTags('Mechanics')
@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post('create')
  @ApiOperation({ summary: 'Yangi mexanik qo\'shish' })
  @ApiResponse({ status: 201, description: 'Yangi mexanik muvaffaqiyatli qo\'shildi.', type: Mechanic })
  async create(@Body() createMechanicDto: CreateMechanicDto): Promise<Mechanic> {
    return await this.mechanicService.create(createMechanicDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Barcha mexaniklarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha mexaniklar muvaffaqiyatli olindi.', type: [Mechanic] })
  async findAll(): Promise<Mechanic[]> {
    return await this.mechanicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali mexanikni olish' })
  @ApiParam({ name: 'id', description: 'Mexanik IDsi' })
  @ApiResponse({ status: 200, description: 'Mexanik muvaffaqiyatli topildi.', type: Mechanic })
  @ApiResponse({ status: 404, description: 'Mexanik topilmadi.' })
  async findOne(@Param('id') id: string): Promise<Mechanic> {
    return await this.mechanicService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID orqali mexanikni yangilash' })
  @ApiParam({ name: 'id', description: 'Mexanik IDsi' })
  @ApiResponse({ status: 200, description: 'Mexanik muvaffaqiyatli yangilandi.', type: Mechanic })
  @ApiResponse({ status: 404, description: 'Mexanik topilmadi.' })
  async update(@Param('id') id: string, @Body() updateMechanicDto: UpdateMechanicDto): Promise<Mechanic> {
    return await this.mechanicService.update(id, updateMechanicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID orqali mexanikni o\'chirish' })
  @ApiParam({ name: 'id', description: 'Mexanik IDsi' })
  @ApiResponse({ status: 204, description: 'Mexanik muvaffaqiyatli o\'chirildi.' })
  @ApiResponse({ status: 404, description: 'Mexanik topilmadi.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.mechanicService.remove(id);
  }

  @Get('activate/:activation_link')  // Bu yerda URL shablonini tekshiring
  async activateMechanic(@Param('activation_link') activationLink: string) {
    // Faollashtirish mantiqi
    const mechanic = await this.mechanicService.activateMechanic(activationLink);
    if (!mechanic) {
      throw new NotFoundException('Faollashtirish havolasi topilmadi');
    }
    return { message: 'Mexanik muvaffaqiyatli faollashtirildi.' };
  }
  
}
