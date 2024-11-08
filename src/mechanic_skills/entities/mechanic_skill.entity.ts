import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

@Entity('mechanic_skills')
export class MechanicSkill {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Unique identifier for the mechanic skill relationship' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The ID of the mechanic' })
    @IsNotEmpty({ message: 'Mechanic ID cannot be empty' })
    @IsString({ message: 'Mechanic ID must be a string' })
    mechanic_id: string;

    @Column()
    @ApiProperty({ description: 'The ID of the skill' })
    @IsNotEmpty({ message: 'Skill ID cannot be empty' })
    @IsString({ message: 'Skill ID must be a string' })
    skill_id: string;

    @ManyToOne(() => Mechanic, (mechanic) => mechanic.mechanicSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mechanic_id' })
    @ApiProperty({ type: Mechanic, description: 'The mechanic associated with this skill' })
    mechanic: Mechanic;

    @ManyToOne(() => Skill, (skill) => skill.mechanicSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skill_id' })
    @ApiProperty({ type: Skill, description: 'The skill associated with this mechanic' })
    skill: Skill;
}
