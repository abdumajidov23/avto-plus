// order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { Car } from '../car/entities/car.entity';
import { Service } from '../services/entities/service.entity';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';


@Module({
  imports: [TypeOrmModule.forFeature([Order, Mechanic, Car, Service])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
