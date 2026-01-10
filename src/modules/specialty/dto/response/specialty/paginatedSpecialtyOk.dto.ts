import { ApiProperty } from "@nestjs/swagger";
import { SpecialtyOkDto } from "./specialtyOk.dto";

export class PaginatedSpecialtyOkDto {
    @ApiProperty({
        description: "Lista de especialidades",
        type: SpecialtyOkDto,
        isArray: true,
    })
    data: SpecialtyOkDto[];
    @ApiProperty({
        description: "Número de página actual",
        example: 1
    })
    current_page: number;
    @ApiProperty({
        description: "Número total de páginas",
        example: 10
    })
    total_pages: number;
}