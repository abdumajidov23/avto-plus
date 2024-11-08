import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  // Explicitly specify the type as 'int' for part_id
    part_id: number;

    @Column({ type: 'int' })  // Explicitly specify the type as 'int' for quantity
    quantity: number;

    @Column({ type: 'timestamp' })  // Use 'timestamp' for the Date column
    last_updated: Date;
}
