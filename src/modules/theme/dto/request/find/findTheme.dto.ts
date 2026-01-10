import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class FindThemeDto
{
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    code:string;
}