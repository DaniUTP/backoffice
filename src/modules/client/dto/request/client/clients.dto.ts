import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { LanguageEnum } from "src/shared/enum/language.enum";

export class ClientsDto {
    @IsEnum(LanguageEnum)
    @IsOptional()
    lang: string;
    @IsInt()
    @IsNotEmpty()
    page: number;
    @IsInt()
    @IsNotEmpty()
    limit: number;
}