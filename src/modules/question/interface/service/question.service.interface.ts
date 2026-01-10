import { ResponseApi } from "src/shared/response/responseApi";
import { CreateQuestionType } from "../../types/create/createQuestionType";
import { UpdateQuestionType } from "../../types/update/updateQuestionType.type";

export interface IQuestionService {
    index(s: string, type: string, theme: number, year: string, page: number, limit: number, language: string): Promise<ResponseApi>;
    store(createQuestionType: CreateQuestionType, language: string): Promise<ResponseApi>;
    show(id: number, language: string): Promise<ResponseApi>;
    update(updateQuestionDto: UpdateQuestionType, language: string): Promise<ResponseApi>;
    year(language: string, page: number, limit: number): Promise<ResponseApi>;
}