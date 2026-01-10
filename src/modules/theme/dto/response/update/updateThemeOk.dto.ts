import { ApiProperty } from "@nestjs/swagger";

export class UpdateThemeOkDto {
    @ApiProperty({
        description: "Mensaje de éxito",
        example: "Tema actualizado correctamente"
    })
    message:string;
}