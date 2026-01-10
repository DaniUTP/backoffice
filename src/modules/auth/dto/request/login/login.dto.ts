import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { ConstantsUtil } from "src/shared/utils/constants.util";

export class LoginDto {
    @ApiProperty({
        description: 'Email del usuario',
        example: 'aldanagerardo24@gmail.com',
    })
    @MaxLength(Number.parseInt(ConstantsUtil.getConstraintValue('email', 'maxLength')))
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Dani$243',
    })
    @IsStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
    @MaxLength(Number.parseInt(ConstantsUtil.getConstraintValue('password', 'maxLength')))
    @MinLength(Number.parseInt(ConstantsUtil.getConstraintValue('password', 'minLength')))
    @IsString()
    @IsNotEmpty()
    password: string;
}
