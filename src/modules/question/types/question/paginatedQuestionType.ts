import { Question } from "../../entity/question.entity";

export type PaginatedQuestionType = {
    data: Question[],
    current_page: number;
    total_pages: number;
}