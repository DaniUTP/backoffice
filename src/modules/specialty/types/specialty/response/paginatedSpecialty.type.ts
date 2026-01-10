import { Theme } from "src/modules/theme/entity/theme.entity"

export type PaginatedSpecialtyType={
    data:Theme[],
    current_page:number,
    total_pages:number
}