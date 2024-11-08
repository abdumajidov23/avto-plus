import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderDetail } from '../../order_details/entities/order_detail.entity';

@Entity('parts')
export class Part {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    stock: number;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.part)
    orderDetails: OrderDetail[];
}
