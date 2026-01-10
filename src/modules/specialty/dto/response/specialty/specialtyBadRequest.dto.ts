import { ApiProperty } from "@nestjs/swagger";

export class SpecialtyBadRequestDto {
    @ApiProperty({
        description:"Mensaje de error",
        example:"El campo debe ser un entero"
    })
    message: string;
}