import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusAreaBadRequestDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: "El campo no cumple con el formato requerido"
    })
    message: string;
}