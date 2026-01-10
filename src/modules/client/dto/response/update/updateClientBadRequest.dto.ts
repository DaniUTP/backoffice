import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientBadRequestDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: {
            email:"El campo es obligatorio"
        }
    })
    errors:{
        [key: string]: string[];
    };
}