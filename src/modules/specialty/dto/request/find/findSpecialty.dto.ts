import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class FindSpecialtyDto {
  @IsNumberString()
  @IsString()
  @IsNotEmpty()
  code: string;
}