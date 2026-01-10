import { ApiProperty } from "@nestjs/swagger";

export class CreateSpecialtyOkDto{
    @ApiProperty({
        description: 'Mensaje de éxito',
        example: 'Se guardo los datos correctamente'
    })
    message:string;
}