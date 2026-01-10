import { Theme } from "../../entity/theme.entity"

export type PaginatedThemeType={
    data:Theme[],
    current_page:number,
    total_pages:number
}