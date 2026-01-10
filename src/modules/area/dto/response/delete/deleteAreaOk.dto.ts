import { ApiProperty } from "@nestjs/swagger";

export class DeleteAreaOkDto {
    @ApiProperty({
        description: "Mensaje de éxito",
        example: "Area eliminada correctamente"
    })
    message: string;
}