import { ApiProperty } from "@nestjs/swagger";

export class FindAreaOkDto {
    @ApiProperty({
        description: "Código de la area",
        example: "403147"
    })
    code: string;
    @ApiProperty({
        description: "Nombre de la area",
        example: "BIOESTADÍSTICA"
    })
    area: string;
    @ApiProperty({
        description: "Descripción de la area",
        example: "BIOESTADÍSTICA"
    })
    description: string;
    @ApiProperty({
        description: "Icono de la area",
        example: "icon-bioestadistica"
    })
    icon: string;
}