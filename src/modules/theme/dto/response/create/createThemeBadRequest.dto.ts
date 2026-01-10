import { ApiProperty } from "@nestjs/swagger";

export class CreateThemeBadRequestDto{
    @ApiProperty({
        description: 'Código del tema',
        example: {
            code:"El campo es requerido",
            id_specialty:"El campo es requerido"
        }
    })
    errors:{
        [key: string]: string[];
    };
}