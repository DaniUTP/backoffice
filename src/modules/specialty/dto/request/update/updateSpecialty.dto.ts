import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateSpecialtyDto {
    @ApiProperty({
        description:"Id del área a la que pertenece la especialidad",
        example:1
    })
    @IsInt()
    @IsNotEmpty()
    area_id: number;
    @ApiProperty({
        description:"Código de la especialidad",
        example:"123456"
    })
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiProperty({
        description:"Nombre de la especialidad",
        example:"Dermatología"
    })
    @IsString()
    @IsNotEmpty()
    specialty: string;
    @ApiProperty({
        description:"Nombre del área",
        example:"Medicina"
    })
    @IsString()
    @IsNotEmpty()
    area: string;
    @ApiProperty({
        description:"Descripción de la especialidad",
        example:"Especialidad médica enfocada en el tratamiento de enfermedades de la piel",
        required:false
    })
    @IsString()
    @IsOptional()
    description: string;
    @ApiProperty({
        description:"Icono de la especialidad",
        example:"dermatology-icon",
        required:false
    })
    @IsString()
    @IsOptional()
    icon: string;
}