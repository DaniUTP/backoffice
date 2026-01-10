import { ApiProperty } from "@nestjs/swagger";

export class ClientBadRequestDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: "El campo debe ser entero"
    })
    message: string;
}