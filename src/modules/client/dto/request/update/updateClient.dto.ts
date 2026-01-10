import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class UpdateClientDto {
    
 @ApiProperty({
        description: 'Email del usuario',
        example: 'aldanagerardo24@gmail.com'
    })
    @MaxLength(parseInt(process.env.EMAIL_MAX_LENGTH || '100'))
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Daniel'
    })
    @MaxLength(parseInt(process.env.NAME_MAX_LENGTH || '20'))
    @MinLength(parseInt(process.env.NAME_MIN_LENGTH || '3'))
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Aldana'
    })
    @MaxLength(parseInt(process.env.LAST_NAME_MAX_LENGTH || '20'))
    @MinLength(parseInt(process.env.LAST_NAME_MIN_LENGTH || '3'))
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        description: 'Número de teléfono',
        example: '666666666'
    })
    @MaxLength(parseInt(process.env.PHONE_MAX_LENGTH || '10'))
    @MinLength(parseInt(process.env.PHONE_MIN_LENGTH || '10'))
    @IsInt()
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty({
        description: 'Universidad del estudiante',
        example: 'UTP'
    })
    @IsAlpha()
    @IsString()
    @IsOptional()
    university: string;
}