import { Area } from "src/modules/area/entity/area.entity";

export type PaginatedAreaType = {
    data: Area[];
    current_page: number;
    total_pages: number;
}