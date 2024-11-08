import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @Column()
  amount: string;

  @Column()
  date: string;

  @Column()
  method: string;

  @Column()
  status: boolean;
}
