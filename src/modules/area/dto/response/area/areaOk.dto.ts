import { ApiProperty } from "@nestjs/swagger";

export class AreaOkDto {
    @ApiProperty({
        description: "Código de la area",
        example: "COD"
    })
    code: string;
    @ApiProperty({
        description: "Nombre de la area",
        example: "Area 1"
    })
    area: string;
    @ApiProperty({
        description: "Descripción de la area",
        example: "Description 1"
    })
    description: string;
    @ApiProperty({
        description: "Estado de la area",
        example: 1
    })
    status: number;
    @ApiProperty({
        description: "Cantidad de especialidades de la area",
        example: 1
    })
    count_specialties: number;
}