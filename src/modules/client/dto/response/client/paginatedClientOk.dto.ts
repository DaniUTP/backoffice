import { ApiProperty } from "@nestjs/swagger";
import { ClientsOkDto } from "./clientsOk.dto";

export class PaginatedClientOkDto{
    @ApiProperty({
        description:"Data del cliente paginada",
        type:[ClientsOkDto]
    })
    data:Array<ClientsOkDto>
    @ApiProperty({
        description:"Página actual",
        example:1
    })
    current_page:number;
    @ApiProperty({
        description:"Total de páginas",
        example:1
    })
    total_page:number;
}