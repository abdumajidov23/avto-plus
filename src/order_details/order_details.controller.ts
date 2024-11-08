import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Buyurtma Detallari')
@Controller('order-details')
export class OrderDetailsController {
    constructor(private readonly orderDetailsService: OrderDetailsService) {}

    @Post()
    @ApiOperation({ summary: 'Yangi buyurtma detalini yaratish' })
    @ApiResponse({ status: 201, description: 'Buyurtma detal muvaffaqiyatli yaratildi.' })
    create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
        return this.orderDetailsService.create(createOrderDetailDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha buyurtma detallari' })
    @ApiResponse({ status: 200, description: 'Barcha buyurtma detallari muvaffaqiyatli olingan.' })
    findAll() {
        return this.orderDetailsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ID bo\'yicha buyurtma detalini olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Buyurtma detal IDsi' })
    @ApiResponse({ status: 200, description: 'Buyurtma detal muvaffaqiyatli olindi.' })
    @ApiResponse({ status: 404, description: 'Buyurtma detal topilmadi' })
    findOne(@Param('id') id: number) {
        return this.orderDetailsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'ID bo\'yicha buyurtma detalini yangilash' })
    @ApiParam({ name: 'id', type: Number, description: 'Buyurtma detal IDsi' })
    @ApiResponse({ status: 200, description: 'Buyurtma detal muvaffaqiyatli yangilandi.' })
    @ApiResponse({ status: 404, description: 'Buyurtma detal topilmadi' })
    update(@Param('id') id: number, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.orderDetailsService.update(id, updateOrderDetailDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'ID bo\'yicha buyurtma detalini o\'chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Buyurtma detal IDsi' })
    @ApiResponse({ status: 200, description: 'Buyurtma detal muvaffaqiyatli o\'chirildi.' })
    @ApiResponse({ status: 404, description: 'Buyurtma detal topilmadi' })
    remove(@Param('id') id: number) {
        return this.orderDetailsService.remove(id);
    }
}
