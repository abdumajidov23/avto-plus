import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string; // yoki number, agar raqam sifatida saqlamoqchi bo'lsangiz

    @OneToMany(() => Appointment, appointment => appointment.service)
    appointments: Appointment[];

    @OneToMany(() => Order, (order) => order.service)
    orders: Order[];
}
