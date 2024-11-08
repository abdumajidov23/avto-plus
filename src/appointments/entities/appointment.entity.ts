import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { Car } from '../../car/entities/car.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Service, service => service.appointments, { eager: true })
    @JoinColumn({ name: 'service_id' }) // Bu joyda ustun nomi kiritiladi
    service: Service;

    @ManyToOne(() => Car, car => car.appointments, { eager: true })
    @JoinColumn({ name: 'car_id' }) // Bu joyda ustun nomi kiritiladi
    car: Car;

    @ManyToOne(() => Client, client => client.appointments, { eager: true })
    @JoinColumn({ name: 'client_id' }) // Bu joyda ustun nomi kiritiladi
    client: Client;

    @Column()
    date: string;

    @Column()
    status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
