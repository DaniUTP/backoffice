import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class ChangeStatusAreaDto {
    @ApiProperty({
        description: 'Código de la area',
        example: 'MED_INT'
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description: 'Nuevo estado de la area',
        example: 0
    })
    @IsInt()
    @IsNotEmpty()
    status: number;
}