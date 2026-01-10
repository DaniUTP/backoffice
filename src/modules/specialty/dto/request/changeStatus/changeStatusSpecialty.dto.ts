import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsInt, IsNumberString } from "class-validator";

export class ChangeStatusSpecialtyDto {
    @ApiProperty({
        description:"Código de la especialidad",
        example:"123123"
    })
    @IsNumberString()
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({
        description:"Status de la especialidad",
        example:1
    })
    @IsNotEmpty()
    @IsInt()
    status: number;
}