import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsNumber, IsNumberString } from "class-validator";

export class ManageThemeDto {
    @ApiProperty({
        description: "Código del tema",
        example: "123456"
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description: "Status del tema",
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    status: number;
}