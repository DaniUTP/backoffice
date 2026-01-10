import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamTypeDto {
    @ApiProperty({
        description:"Cuerpo de la solicitud",
        example:"RM"
    })
    @IsString()
    @IsNotEmpty()
    exam_type: string;
}