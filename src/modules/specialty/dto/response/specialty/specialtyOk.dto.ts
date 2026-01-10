import { ApiProperty } from "@nestjs/swagger";

export class SpecialtyOkDto{
    @ApiProperty({
        description:"Código de la especialidad",
        example:"COD0001"
    })
    code: string;
    @ApiProperty({
        description:"Nombre de la especialidad",
        example:"Especialidad 1"
    })
    specialty: string;
    @ApiProperty({
        description:"Área de la especialidad",
        example:"Medicina"
    })
    area: string;
    @ApiProperty({
        description:"Descripción de la especialidad",
        example:"Especialidad 1"
    })
    description: string;
    @ApiProperty({
        description:"Estado de la especialidad",
        example:1
    })
    status: number;
    @ApiProperty({
        description:"Número de temas de la especialidad",
        example:10
    })
    count_themes: number;
}