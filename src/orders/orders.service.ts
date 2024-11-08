import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  // Get all orders with related entities
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['mechanic', 'car', 'service'],
    });
  }

  // Get one order by id, throwing an exception if not found
  async findOne(id: number): Promise<Order> {
    try {
      return await this.orderRepository.findOneOrFail({
        where: { id },
        relations: ['mechanic', 'car', 'service'],
      });
    } catch (error) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }

  // Update an existing order
  async update(id: number, updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);

    try {
      return await this.orderRepository.findOneOrFail({
        where: { id },
        relations: ['mechanic', 'car', 'service'],
      });
    } catch (error) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }

  // Delete an order
  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
