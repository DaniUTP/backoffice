import { ApiProperty } from "@nestjs/swagger";

export class ThemeBadRequestDto{
    @ApiProperty({
        description: 'Código del tema',
        example: "El campo debe ser entero"
    })
    message:string;
}