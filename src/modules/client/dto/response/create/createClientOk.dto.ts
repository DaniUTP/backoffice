import { ApiProperty } from "@nestjs/swagger";

export class CreateClientOkDto {
    @ApiProperty(
        {
            description: 'Usuario creado',
            example: 'Se guardo los datos correctamente'
        }
    )
    message: string;
}