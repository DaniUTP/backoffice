import { ApiProperty } from "@nestjs/swagger";

export class CreateAreaCreatedDto {
    @ApiProperty({
        description: 'Mensaje de creación exitosa',
        example: 'Se guardo los datos correctamente'
    })
     message:string;
}