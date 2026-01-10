import { IsInt, IsNotEmpty } from "class-validator";

export class FindQuestionDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}