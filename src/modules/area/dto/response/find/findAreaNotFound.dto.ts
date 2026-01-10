import { ApiProperty } from "@nestjs/swagger";

export class FindAreaNotFoundDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: "El area no existe"
    })
    message: string;
}