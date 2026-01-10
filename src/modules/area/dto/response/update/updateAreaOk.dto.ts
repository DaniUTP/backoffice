import { ApiProperty } from "@nestjs/swagger";

export class UpdateAreaOkDto {
    @ApiProperty({
        description: 'Mensaje de éxito',
        example: 'Area actualizada correctamente'
    })
    message: string;
}