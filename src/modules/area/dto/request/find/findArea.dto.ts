import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class FindAreaDto {
  @IsNumberString()
  @IsString()
  @IsNotEmpty()
  code: string;
}