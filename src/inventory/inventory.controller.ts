import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new inventory record' })
    @ApiResponse({ status: 201, description: 'The inventory has been successfully created.', type: Inventory })
    create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        return this.inventoryService.create(createInventoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all inventory records' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all inventory records', type: [Inventory] })
    findAll(): Promise<Inventory[]> {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single inventory record by ID' })
    @ApiParam({ name: 'id', description: 'Inventory ID' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved inventory record', type: Inventory })
    findOne(@Param('id') id: number): Promise<Inventory> {
        return this.inventoryService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing inventory record by ID' })
    @ApiParam({ name: 'id', description: 'Inventory ID' })
    @ApiResponse({ status: 200, description: 'Successfully updated inventory record', type: Inventory })
    update(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
        return this.inventoryService.update(id, updateInventoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an inventory record by ID' })
    @ApiParam({ name: 'id', description: 'Inventory ID' })
    @ApiResponse({ status: 200, description: 'Successfully deleted inventory record' })
    remove(@Param('id') id: number): Promise<void> {
        return this.inventoryService.remove(id);
    }
}
