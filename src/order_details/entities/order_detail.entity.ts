import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Part } from '../../parts/entities/part.entity';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('order_details')
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    part_id: number;

    @Column()
    quantity: number;

    @Column()
    total_price: number;
    
    @ManyToOne(() => Order, (order) => order.orderDetails)
    order: Order;

    @ManyToOne(() => Part, part => part.orderDetails)
    part: Part;


}
