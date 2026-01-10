import { ApiProperty } from "@nestjs/swagger";

export class UpdateThemeBadRequestDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: {
            code: "El campo es requerido"
        }
    })
    errors:{
        [key: string]: string[];
    };
}