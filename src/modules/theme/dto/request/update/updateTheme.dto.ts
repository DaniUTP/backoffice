import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UpdateThemeDto {
    
    @ApiProperty({
        description: "Código del tema",
        example: "123456"
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description: "Especialidad del tema",
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    id_specialty: number;
    @ApiProperty({
        description: "Nombre del tema",
        example: "Tema 1"
    })
    @IsString()
    @IsNotEmpty()
    theme: string;
    @ApiProperty({
        description: "Descripción del tema",
        example: "Descripción del tema 1"
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}