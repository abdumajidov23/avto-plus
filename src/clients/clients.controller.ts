import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './clients.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';


@ApiTags('Mijozlar')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientService) {}

  @Post('create')
  @ApiOperation({ summary: 'Yangi mijoz yaratish' })
  @ApiResponse({ status: 201, description: 'Mijoz muvaffaqiyatli yaratildi.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @UseGuards(AdminGuard)
  @Get('get')
  @ApiOperation({ summary: 'Barcha mijozlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha mijozlar muvaffaqiyatli olindi.' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha mijozni olish' })
  @ApiParam({ name: 'id', type: String, description: 'Mijoz IDsi' })
  @ApiResponse({ status: 200, description: 'Mijoz muvaffaqiyatli olindi.' })
  @ApiResponse({ status: 404, description: 'Mijoz topilmadi' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id); // 'id'ni numberga aylantiramiz
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo\'yicha mijozni yangilash' })
  @ApiParam({ name: 'id', type: String, description: 'Mijoz IDsi' })
  @ApiResponse({ status: 200, description: 'Mijoz muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Mijoz topilmadi' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto); // 'id'ni numberga aylantiramiz
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo\'yicha mijozni o\'chirish' })
  @ApiParam({ name: 'id', type: String, description: 'Mijoz IDsi' })
  @ApiResponse({ status: 200, description: 'Mijoz muvaffaqiyatli o\'chirildi.' })
  @ApiResponse({ status: 404, description: 'Mijoz topilmadi' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id); // 'id'ni numberga aylantiramiz
  }

  @UseGuards(AdminGuard)
  @Post('activate')
  @ApiOperation({ summary: 'Activation linkni qabul qilish' })
  @ApiResponse({ status: 200, description: 'Activation link muvaffaqiyatli qabul qilindi.' })
  activateCliet(@Body() activateCliet: string) {

    return this.clientsService.activateClient(activateCliet);
  }
}
