import { ApiProperty } from "@nestjs/swagger";

export class UpdateSpecialtyBadRequestDto {
    @ApiProperty({
        description:"Mala petición",
        example:{
            area_id:"El campo es requerido",
            code:"El campo es requerido"
        }
    })
    errors:{
        [key: string]: string[];
    };
}