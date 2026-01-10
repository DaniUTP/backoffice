import { IsInt, IsNotEmpty } from "class-validator";
import { LanguageDto } from "src/shared/dto/language.dto";

export class ExampTypeDto extends LanguageDto {
    @IsInt()
    @IsNotEmpty()
    page: number;
    
    @IsInt()
    @IsNotEmpty()
    limit: number;
}