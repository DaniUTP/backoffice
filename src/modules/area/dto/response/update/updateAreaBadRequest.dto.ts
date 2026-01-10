import { ApiProperty } from "@nestjs/swagger";

export class UpdateAreaBadRequestDto {
    @ApiProperty({
        description: "Mensaje de error",
        example: {
            code: "El campo es obligatorio"
        }
    })
    errors: {
        [key: string]: string[];
    };
}