import { ExamType } from "../../entity/exam-type.entity"

export type PaginatedExamType={
    data:ExamType[],
    current_page:number;
    total_pages:number;
}