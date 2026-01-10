import { ApiProperty } from "@nestjs/swagger";

export class FindThemeNotFoundDto {
    @ApiProperty({
        description: 'Mensaje de error',
        example: 'El tema no existe'
    })
    message: string;
}