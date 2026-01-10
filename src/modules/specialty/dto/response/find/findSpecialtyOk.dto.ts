import { ApiProperty } from "@nestjs/swagger";

export class FindSpecialtyOkDto{
    @ApiProperty({
        description:"Código de la especialidad",
        example:"105676"
    })
    code:string;
    @ApiProperty({
        description:"Especialidad",
        example:"SALUD PÚBLICA Y MEDICINA PREVENTIVA"
    })
    specialty:string;
    @ApiProperty({
        description:"ID del área",
        example:15
    })
    area_id:number;
    @ApiProperty({
        description:"Nombre del área",
        example:"SALUD PÚBLICA"
    })
    name_area:string;
    @ApiProperty({
        description:"Descripción de la especialidad",
        example:"Especialidad médica que se enfoca en la prevención y el tratamiento de enfermedades."
    })
    description:string;
    @ApiProperty({
        description:"Icono de la especialidad",
        example:"https://example.com/icon.png"
    })
    icon:string;
}