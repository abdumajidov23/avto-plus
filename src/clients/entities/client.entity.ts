import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { Car } from '../../car/entities/car.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier for the client',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the client',
    example: 'John Doe',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    description: 'Phone number of the client',
    example: '+998991233445',
  })
  @IsPhoneNumber()
  @Column({ type: 'varchar', length: 255 })
  phone_number: string;

  @ApiProperty({
    description: 'Email address of the client',
    example: 'john.doe@example.com',
  })
  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Address of the client',
    example: '123 Main St, Springfield, IL',
  })
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ApiProperty({
    description: 'Login username of the client',
    example: 'johndoe123',
  })
  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Hashed refresh token for the client',
    example: 'hashed_refresh_token_example',
  })
  hashed_refresh_token?: string;

  @Column()
  is_active: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Hashed password for the client',
    example: 'hashed_password_example',
  })
  hashed_password?: string;

  @Column({ nullable: true })
  activation_link?: string;

  @OneToMany(() => Car, (car) => car.client)
  @ApiProperty({
    description: 'List of cars owned by the client',
    type: () => [Car],
  })
  cars: Car[];

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  @ApiProperty({
    description: 'List of appointments for the client',
    type: () => [Appointment],
  })
  appointments: Appointment[];
}
