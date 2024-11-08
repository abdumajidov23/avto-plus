import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payments.service';  // To'g'rilash
import { PaymentController } from './payments.controller';  // To'g'rilash
import { Payment } from './entities/payment.entity';  // Payment entity
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentController],  // To'g'rilash
  providers: [PaymentService],  // To'g'rilash
})
export class PaymentsModule {}
