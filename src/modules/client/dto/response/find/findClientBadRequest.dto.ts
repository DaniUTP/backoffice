import { ApiProperty } from "@nestjs/swagger";

export class FindClientBadRequestDto{
    @ApiProperty({
        description:"Mensaje de error",
        example:"El usuario no existe"
    })
    message:string;
}