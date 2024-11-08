import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { Car } from '../../car/entities/car.entity';
import { Service } from '../../services/entities/service.entity';
import { OrderDetail } from '../../order_details/entities/order_detail.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: string;

  @Column()
  status: string;

  @Column()
  total_price: string;

  @Column()
  car_id: number;

  @Column()
  service_id: number;

  @Column()
  mechanic_id: string;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Mechanic, (mechanic) => mechanic.orders)
  @JoinColumn({ name: 'mechanic_id' })
  mechanic: Mechanic;

  @ManyToOne(() => Car, (car) => car.orders)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => Service, (service) => service.orders)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column()
  date: string;
}
