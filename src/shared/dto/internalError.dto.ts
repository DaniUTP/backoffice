import { ApiProperty } from "@nestjs/swagger";

export class InternalServerDto {
    @ApiProperty({
        description: 'Mensaje de error',
        example: 'Ocurrio un error, intentelo más tarde',
    })
    message: string;
}