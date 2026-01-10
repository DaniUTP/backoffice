import { ApiProperty } from "@nestjs/swagger";

export class FinClientOkDto{
    @ApiProperty({
        description:"Nombre del cliente",
        example:"Juan"
    })
    name:string;
    @ApiProperty({
        description:"Apellido del cliente",
        example:"Perez"
    })
    last_name:string;
    @ApiProperty({
        description:"Email del cliente",
        example:"juan.perez@example.com"
    })
    email:string;
    @ApiProperty({
        description:"Universidad del cliente",
        example:"Universidad de XYZ"
    })  
    university:string;
    @ApiProperty({
        description:"Número de teléfono del cliente",
        example:"1234567890"
    })
    phone:string;
}