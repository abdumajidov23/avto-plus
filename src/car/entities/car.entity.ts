import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Client } from '../../clients/entities/client.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the car' })
  id: number;

  @ManyToOne(() => Client, (client) => client.cars, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  @ApiProperty({ description: 'Client owning the car' })
  client: Client;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Car make', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  make: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Car model', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  model: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Year of manufacture', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  year: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'License plate number', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Current status of the car' })
  @IsString()
  @IsOptional()
  status: string;

  @Column()
  @ApiProperty({ description: 'Client ID', example: 1 })
  @IsNumber()
  client_id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Transmission type', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Date of last service', maxLength: 255 })
  @IsString()
  @IsOptional()
  last_service_date: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Owner note' })
  @IsString()
  @IsOptional()
  owner_note: string;

  @Column({ type: 'boolean' })
  @ApiProperty({ description: 'Insurance status of the car' })
  @IsBoolean()
  insurance_status: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.car)
  @ApiProperty({ description: 'List of appointments associated with the car', type: () => [Appointment] })
  appointments: Appointment[];

  @OneToMany(() => Order, (order) => order.car)
  @ApiProperty({ description: 'List of orders associated with the car', type: () => [Order] })
  orders: Order[];
}
