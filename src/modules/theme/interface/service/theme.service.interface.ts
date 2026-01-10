import { ResponseApi } from "src/shared/response/responseApi";
import { CreateThemeType } from "../../types/create/createTheme.type";
import { UpdateThemeType } from "../../types/update/updateTheme.type";
import { ManageThemeType } from "../../types/manage/manageTheme.type";

export interface IThemeService {
    index(page: number, limit: number, language: string): Promise<ResponseApi>;
    store(themeType: CreateThemeType, language: string): Promise<ResponseApi>;
    show(code: string, language: string): Promise<ResponseApi>;
    update(updateThemeType: UpdateThemeType, language: string): Promise<ResponseApi>;
    manage(manageTheme: ManageThemeType, language: string): Promise<ResponseApi>;
    allThemes(language: string): Promise<ResponseApi>;
}