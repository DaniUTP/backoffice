import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusAreaNotFoundDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: "El área no fue encontrada"
    })
    message: string;
}