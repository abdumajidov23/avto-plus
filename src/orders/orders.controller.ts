import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './orders.service';
import { Order } from './entities/order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Buyurtmalar')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Buyurtma muvaffaqiyatli yaratildi.',
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha buyurtmalar muvaffaqiyatli olindi.',
  })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha buyurtmani olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma IDsi' })
  @ApiResponse({
    status: 200,
    description: 'Buyurtma muvaffaqiyatli olindi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Buyurtma topilmadi.',
  })
  findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ID bo\'yicha buyurtmani yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma IDsi' })
  @ApiResponse({
    status: 200,
    description: 'Buyurtma muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Buyurtma topilmadi.',
  })
  update(
    @Param('id') id: number,
    @Body() updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo\'yicha buyurtmani o\'chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma IDsi' })
  @ApiResponse({
    status: 200,
    description: 'Buyurtma muvaffaqiyatli o\'chirildi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Buyurtma topilmadi.',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
