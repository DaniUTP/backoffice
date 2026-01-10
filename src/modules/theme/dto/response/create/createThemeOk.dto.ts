import { ApiProperty } from "@nestjs/swagger";

export class CreateThemeOkDto{
    @ApiProperty({
        description: 'Código del tema',
        example: 'Tema creado correctamente'
    })
    message:string;
}