import { ExamType } from "src/modules/examType/entity/exam-type.entity";
import { Question } from "../../entity/question.entity";
import { CreateQuestionType } from "../../types/create/createQuestionType";
import { PaginatedQuestionType } from "../../types/question/paginatedQuestionType";
import { UpdateQuestionType } from "../../types/update/updateQuestionType.type";

export interface IQuestionRepository {
    index(s: string, type: string, theme: number, year: string, page: number, limit: number): Promise<PaginatedQuestionType>;
    existQuestion(question: string): Promise<number>;
    findQuestion(id: number): Promise<Question | null>;
    store(createQuestionType: CreateQuestionType): Promise<void>;
    update(updateQuestionDto: UpdateQuestionType): Promise<void>;
    year(page: number, limit: number): Promise<PaginatedQuestionType>;
}