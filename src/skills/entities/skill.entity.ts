// src/skills/entities/skill.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { MechanicSkill } from '../../mechanic_skills/entities/mechanic_skill.entity';

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;


    @OneToMany(() => MechanicSkill, (mechanicSkill) => mechanicSkill.skill)
    mechanicSkills: MechanicSkill[];
}
