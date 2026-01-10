import { ApiProperty } from "@nestjs/swagger";
import { ThemeOkDto } from "./themeOk.dto";

export class PaginatedThemeOkDto {
    @ApiProperty({
        description: 'Lista de temas',
        type: [ThemeOkDto]
    })
    data: ThemeOkDto[];
    @ApiProperty({
        description: 'Página actual',
        example: 1
    })
    current_page: number;
    @ApiProperty({
        description: 'Total de páginas',
        example: 10
    })
    total_pages: number;
}