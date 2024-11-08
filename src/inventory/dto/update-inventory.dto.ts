import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateInventoryDto {
    @IsOptional()
    part_id?: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsDateString() // Allows both Date string and Date object
    last_updated?: string | Date; // Accepts both Date and Date string
}
