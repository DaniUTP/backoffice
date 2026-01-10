import { IsInt, IsNotEmpty, Min } from "class-validator";
import { LanguageDto } from "src/shared/dto/language.dto";

export class AreaDto extends LanguageDto {
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    page: number;

    @Min(1)
    @IsInt()
    @IsNotEmpty()
    limit: number;
}