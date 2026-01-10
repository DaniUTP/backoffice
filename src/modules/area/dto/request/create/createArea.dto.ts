import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateAreaDto{
    @ApiProperty({
        description: "Código de la area",
        example: "COD"
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description: "Nombre de la area",
        example: "Area 1"
    })
    @IsString()
    @IsNotEmpty()
    area: string;
    @ApiProperty({
        description: "Descripción de la area",
        example: "Description 1"
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    @ApiProperty({
        description: "Icono de la area",
        example: "Icon 1"
    })
    @IsString()
    @IsOptional()
    icon:string;
}