import { IsNotEmpty, IsNumber } from "class-validator";

export class FindExamTypeDto{
    @IsNumber()
    @IsNotEmpty()
    id: number
}