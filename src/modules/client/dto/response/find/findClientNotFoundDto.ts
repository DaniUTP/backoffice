import { ApiProperty } from "@nestjs/swagger";

export class FindClientNotFoundDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: "El cliente no existe"
    })
    message: string;
}