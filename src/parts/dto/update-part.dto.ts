import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePartDto {
    @ApiProperty({
        description: 'Qism nomi',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Qism narxi',
        type: Number,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Qism tavsifi',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Zaxira miqdori',
        type: Number,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    stock?: number;
}
