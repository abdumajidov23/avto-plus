import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateInventoryDto {
    @IsInt()
    part_id: number;

    @IsInt()
    quantity: number;

    @IsDateString()
    @Transform(({ value }) => new Date(value)) // Convert string to Date object
    last_updated: string | Date; // Can accept both string and Date types
}
