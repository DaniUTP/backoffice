import { ApiProperty } from "@nestjs/swagger";

export class FindThemeOkDto {
    @ApiProperty({
        description: 'Código del tema',
        example: '123456'
    })
    code: string;
    @ApiProperty({
        description: 'Id de la especialidad',
        example: 1
    })
    id_specialty: number;
    @ApiProperty({
        description: 'Tema',
        example: 'Tema 1'
    })
    theme: string;
    @ApiProperty({
        description: 'Descripción del tema',
        example: 'Descripción del tema 1'
    })
    description: string;
}