import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientOkDto {
    @ApiProperty({
        description: "Mensaje de éxito",
        example: "Perfil actualizado con éxito"
    })
    message: string;
}