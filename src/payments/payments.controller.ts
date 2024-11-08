import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('To\'lovlar')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('all')
  @ApiOperation({ summary: 'Barcha to\'lovlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha to\'lovlar muvaffaqiyatli olishdi.' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha to\'lovni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'To\'lov IDsi' })
  @ApiResponse({ status: 200, description: 'To\'lov muvaffaqiyatli olindi.' })
  @ApiResponse({ status: 404, description: 'To\'lov topilmadi' })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Post(':orderId')
  @ApiOperation({ summary: 'Yangi to\'lov yaratish' })
  @ApiParam({ name: 'orderId', type: Number, description: 'Buyurtma IDsi' })
  @ApiResponse({ status: 201, description: 'To\'lov muvaffaqiyatli yaratildi.' })
  create(@Body() paymentData: CreatePaymentDto, @Param('orderId') orderId: number) {
    return this.paymentService.create(paymentData, orderId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ID bo\'yicha to\'lovni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'To\'lov IDsi' })
  @ApiResponse({ status: 200, description: 'To\'lov muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'To\'lov topilmadi' })
  update(@Param('id') id: number, @Body() paymentData: UpdatePaymentDto) {
    return this.paymentService.update(id, paymentData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo\'yicha to\'lovni o\'chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'To\'lov IDsi' })
  @ApiResponse({ status: 200, description: 'To\'lov muvaffaqiyatli o\'chirildi.' })
  @ApiResponse({ status: 404, description: 'To\'lov topilmadi' })
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }
}
