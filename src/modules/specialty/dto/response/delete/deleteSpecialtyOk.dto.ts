import { ApiProperty } from "@nestjs/swagger";

export class DeleteSpecialtyOkDto{
    @ApiProperty({
        description:"Mensaje de éxito",
        example:"Especialidad eliminada correctamente"
    })
    message:string;
}
