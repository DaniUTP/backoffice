import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class FindClientDto{
    @Transform(({ value }) => value ? parseInt(value) : value)
    @IsInt()
    @IsNotEmpty()
    id:number;
}