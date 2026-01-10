import { ApiProperty } from "@nestjs/swagger";

export class ClientsOkDto {
    @ApiProperty({
        description: "Identificador del cliente",
        example: 1
    })
    id:number;
    @ApiProperty({
        description: "Nombre del cliente",
        example: "Daniel"
    })
    name: string;
    @ApiProperty({
        description: "Email del cliente",
        example: "aldanagerardo24@gmail.com"
    })
    email: string;
    @ApiProperty({
        description: "Universidad del cliente",
        example: "UTP"
    })
    university: string;
    @ApiProperty({
        description: "Estado del cliente",
        example: 1
    })
    status: number;
}