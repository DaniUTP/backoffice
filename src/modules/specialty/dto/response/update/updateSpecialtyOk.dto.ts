import { ApiProperty } from "@nestjs/swagger";

export class UpdateSpecialtyOkDto{
     @ApiProperty({
        description:"La especialidad fue actualizada con éxito.",
        example:"Se actualizaron los datos correctamente"
    })
    message:string;
}