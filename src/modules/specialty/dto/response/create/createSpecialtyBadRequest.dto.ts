import { ApiProperty } from "@nestjs/swagger";

export class CreateSpecialtyBadRequestDto{
    @ApiProperty({
        description: 'Mensaje de error',
        example: 'La especialidad ya existe'
    })
    message:string;
}