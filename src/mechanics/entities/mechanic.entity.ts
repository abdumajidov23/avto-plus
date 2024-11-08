import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MechanicSkill } from '../../mechanic_skills/entities/mechanic_skill.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Order } from '../../orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Mechanic {
  @ApiProperty({
    example: 'b7d9b38e-01c1-4c55-991d-65476b3f8f12',
    description: 'Mexanik ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Mexanik ismi' })
  @Column()
  name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Mexanik telefon raqami',
  })
  @Column()
  phone_number: string;

  @ApiProperty({
    example: 'Auto Mechanic',
    description: 'Mexanik mutaxassisligi',
  })
  @Column()
  specialization: string;

  @ApiProperty({ example: 'Expert', description: 'Mexanik darajasi' })
  @Column()
  proficiency_level: string;

  @ApiProperty({ example: 12345, description: 'Mexanik login' })
  @Column()
  login: string;

  @ApiProperty({ example: 'securepassword', description: 'Mexanik paroli' })
  @Column()
  password: string;

  @ApiProperty({ example: 'Admin', description: 'Mexanik yaratuvchisi' })
  @Column()
  creator: string;

  @ApiProperty({
    example: true,
    description: 'Mexanik aktiv holati',
    default: true,
  })
  @Column({ default: false })
  is_active: boolean;

  @Column({default:null})
  hashed_refresh_token?: string;

  @Column({ default: null })
  hashed_password?: string;

  @Column({ default: null })
  activation_link?: string;

  @OneToMany(() => Order, (order) => order.mechanic)
  orders: Order[];

  @OneToMany(() => MechanicSkill, (mechanicSkill) => mechanicSkill.mechanic)
  mechanicSkills: MechanicSkill[];

  @ManyToMany(() => Skill, (skill) => skill.mechanicSkills)
  @JoinTable()
  skills: Skill[];
}
