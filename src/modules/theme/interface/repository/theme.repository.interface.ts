import { Theme } from "../../entity/theme.entity";
import { CreateThemeType } from "../../types/create/createTheme.type";
import { ManageThemeType } from "../../types/manage/manageTheme.type";
import { PaginatedThemeType } from "../../types/theme/paginatedTheme.type";
import { UpdateThemeType } from "../../types/update/updateTheme.type";

export interface IThemeRepository {
    index(page: number, limit: number): Promise<PaginatedThemeType>;
    store(themeType: CreateThemeType): Promise<void>;
    show(code: string, attributes: Array<string>): Promise<Theme | null>;
    update(updateThemeType: UpdateThemeType): Promise<void>;
    manage(manageTheme: ManageThemeType): Promise<void>;
    allThemes(): Promise<Theme[]>;
}