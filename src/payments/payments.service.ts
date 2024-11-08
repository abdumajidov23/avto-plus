import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}


  async creat(paymentData: Partial<Payment>, orderId: number) {
    // Check if the order exists
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Create the new payment entity
    const payment = this.paymentRepository.create({
      ...paymentData,
      order, // Associate the payment with the found order
    });

    // Save the payment entity to the database
    return await this.paymentRepository.save(payment);
  }

  // Barcha to'lovlarni olish
  findAll() {
    return this.paymentRepository.find({
      relations: ['order'],  // Order bilan bog'lanish
    });
  }

  // ID bo'yicha to'lovni olish
  findOne(id: number) {
    return this.paymentRepository.findOne({
      where: { id },  // Bu yerda where qo'shish kerak
      relations: ['order'],  // Order bilan bog'lanish
    });
  }

  // Yangi to'lov qo'shish
  async create(paymentData: Partial<Payment>, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },  // Bu yerda where qo'shish kerak
    });
    if (!order) {
      throw new Error('Order not found');
    }
    const payment = this.paymentRepository.create({
      ...paymentData,
      order,
    });
    return this.paymentRepository.save(payment);
  }

  // To'lovni yangilash
  async update(id: number, paymentData: Partial<Payment>) {
    const payment = await this.paymentRepository.findOne({
      where: { id },  // Bu yerda where qo'shish kerak
    });
    if (!payment) {
      throw new Error('Payment not found');
    }
    await this.paymentRepository.update(id, paymentData);
    return this.paymentRepository.findOne({
      where: { id },  // Bu yerda where qo'shish kerak
    });
  }

  // To'lovni o'chirish
  async remove(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },  // Bu yerda where qo'shish kerak
    });
    if (payment) {
      await this.paymentRepository.remove(payment);
      return { deleted: true };
    }
    return { deleted: false, message: 'Payment not found' };
  }
}
