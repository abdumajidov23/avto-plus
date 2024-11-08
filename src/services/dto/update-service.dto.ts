import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    price?: string; // yoki number
}
