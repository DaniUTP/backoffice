import { ApiProperty } from "@nestjs/swagger";

export class ThemeOkDto{
    @ApiProperty({
        description: 'Código del tema',
        example: '1234567890'
    })
    code:string;
    @ApiProperty({
        description: 'Nombre del tema',
        example: 'Tema 1'
    })
    theme:string;
    @ApiProperty({
        description: 'Nombre de la especialidad',
        example: 'Especialidad 1'
    })
    name_specialty:string;
    @ApiProperty({
        description: 'Descripción del tema',
        example: 'Descripción del tema 1'
    })
    description:string;
    @ApiProperty({
        description: 'Estado del tema',
        example: 1
    })
    status:number;
    @ApiProperty({
        description: 'Cantidad de preguntas',
        example: 10
    })
    count_questions:number;
}