import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ChangeStatusClientDto{
    @ApiProperty({
        description: 'Email del usuario',
        example: 'aldanagerardo24@gmail.com'
    })
    @MaxLength(parseInt(process.env.EMAIL_MAX_LENGTH || '100'))
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
    @ApiProperty({
        description: 'Cambio de estado del usuario',
        example: 0
    })
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseInt(value);
        }
        return value;
    })
    status:number;
}