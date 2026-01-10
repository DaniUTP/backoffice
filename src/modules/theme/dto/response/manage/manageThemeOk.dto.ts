import { ApiProperty } from "@nestjs/swagger";

export class ManageThemeOkDto{
    @ApiProperty({
        description: 'Mensaje de éxito',
        example: 'Tema actualizado correctamente'
    })
    message: string;
}