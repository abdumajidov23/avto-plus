import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Cars') // Swagger uchun umumiy teglar qo'shish
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({ status: 201, description: 'The car has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'Return all cars.' })
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiParam({ name: 'id', description: 'ID of the car to retrieve' })
  @ApiResponse({ status: 200, description: 'Return a car.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car by ID' })
  @ApiParam({ name: 'id', description: 'ID of the car to update' })
  @ApiResponse({ status: 200, description: 'The car has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car by ID' })
  @ApiParam({ name: 'id', description: 'ID of the car to delete' })
  @ApiResponse({ status: 200, description: 'The car has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
