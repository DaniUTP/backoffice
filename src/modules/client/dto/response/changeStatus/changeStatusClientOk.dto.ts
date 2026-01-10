import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusClientOkDto{
    @ApiProperty({
        description:"Mensaje de éxito",
        example:"El estado ha sido actualizado"
    })
    message:string;
}