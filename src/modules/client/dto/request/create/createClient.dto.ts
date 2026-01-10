import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsAlpha, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateClientDto {

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
        description: 'Contraseña',
        example: 'Dani$243'
    })
    @IsStrongPassword({
        minLowercase: parseInt(process.env.PASSWORD_MIN_LOWERCASE || '1'),
        minNumbers: parseInt(process.env.PASSWORD_MIN_NUMBERS || '1'),
        minUppercase: parseInt(process.env.PASSWORD_MIN_UPPERCASE || '1'),
        minSymbols: parseInt(process.env.PASSWORD_MIN_SYMBOLS || '1'),
    })
    @MaxLength(parseInt(process.env.PASSWORD_MAX_LENGTH || '16'))
    @MinLength(parseInt(process.env.PASSWORD_MIN_LENGTH || '8'))
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Número de teléfono',
        example: 666666666
    })

    @Max(parseInt(process.env.PHONE_MAX_LENGTH || '999999999'))
    @Min(parseInt(process.env.PHONE_MIN_LENGTH || '100000000'))
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value) : value)
    phone: number;

    @ApiProperty({
        description: 'Universidad del estudiante',
        example: 'UTP'
    })
    @IsAlpha()
    @IsString()
    @IsOptional()
    university: string;
}
