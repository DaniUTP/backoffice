import { IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";
import { LanguageDto } from "src/shared/dto/language.dto";

export class QuestionDto extends LanguageDto {

    @IsString()
    @IsOptional()
    year: string;

    @IsInt()
    @IsOptional()
    theme: number;

    @IsString()
    @IsOptional()
    type: string;

    @MinLength(3)
    @IsOptional()
    s: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    page: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    limit: number;
}