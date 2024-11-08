import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';


@Injectable()
export class OrderDetailsService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
    ) {}

    async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
        const orderDetail = this.orderDetailsRepository.create(createOrderDetailDto);
        return this.orderDetailsRepository.save(orderDetail);
    }

    async findAll(): Promise<OrderDetail[]> {
        return this.orderDetailsRepository.find();
    }

    async findOne(id: number): Promise<OrderDetail> {
        const orderDetail = await this.orderDetailsRepository.findOne({ where: { id } });
        if (!orderDetail) throw new NotFoundException('Order Detail not found');
        return orderDetail;
    }

    async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail> {
        await this.orderDetailsRepository.update(id, updateOrderDetailDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.orderDetailsRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Order Detail not found');
    }
}
