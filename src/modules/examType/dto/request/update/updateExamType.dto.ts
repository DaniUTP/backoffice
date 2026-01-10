import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateExamTypeDto {
    @ApiProperty({
        description: "Identificador único del tipo de examen",
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
    @ApiProperty({
        description: "Nombre del tipo de examen",
        example: "RM"
    })
    @IsString()
    @IsNotEmpty()
    exam_type: string;
}