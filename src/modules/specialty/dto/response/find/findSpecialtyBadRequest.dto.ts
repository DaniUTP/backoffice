import { ApiProperty } from "@nestjs/swagger";

export class FindSpecialtyBadRequestDto{
    @ApiProperty({
        description:"Mala petición",
        example:"El campo no cumple con el formato requerido"
    })
    message:string;
}