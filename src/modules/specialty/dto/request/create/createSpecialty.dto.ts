import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt,IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LanguageEnum } from "src/shared/enum/language.enum";

export class CreateSpecialtyDto
{
    @IsEnum(LanguageEnum)
    @IsOptional()
    lang: string;
    @ApiProperty({
        description: 'Id del área',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    id_area: number;
    @ApiProperty({
        description: 'Nombre de la especialidad',
        example: 'Dermatología'
    })
    @IsString()
    @IsNotEmpty()
    specialty: string;
    @ApiProperty({
        description: 'Código de la especialidad',
        example: 'D001'
    })
    @IsNumberString()
    @IsString()
    @IsOptional()
    code: string;
    @ApiProperty({
        description: 'Descripción de la especialidad',
        example: 'Especialidad médica enfocada en la salud de la piel'
    })
    @IsString()
    @IsOptional()
    description: string;
    @ApiProperty({
        description: 'Icono de la especialidad',
        example: 'https://example.com/icon.png'
    })
    @IsString()
    @IsOptional()
    icon: string;
}