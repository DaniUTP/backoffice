import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
export class CreateThemeDto {
    @ApiProperty({
        description: 'Código del tema',
        example: '123456'
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description: 'Identificador de la especialidad',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    id_specialty: number;
    @ApiProperty({
        description: 'Tema',
        example: 'Tema 1'
    })
    @IsString()
    @IsNotEmpty()
    theme: string;
    @ApiProperty({
        description: 'Descripción',
        example: 'Descripción del tema 1'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    @ApiProperty({
        description: 'Icono',
        example: 'icono1'
    })
    @IsString()
    @IsOptional()
    icon: string;
}