import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusSpecialtyOkDto{
    @ApiProperty({
        description:"Mensaje de éxito",
        example:"Se actualizaron los datos correctamente"
    })
    message:string;
}