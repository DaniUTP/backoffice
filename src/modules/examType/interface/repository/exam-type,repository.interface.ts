import { UpdateExamTypeDto } from "../../dto/request/update/updateExamType.dto";
import { ExamType } from "../../entity/exam-type.entity";
import { CreateExamType } from "../../types/create/createExamType.type";
import { PaginatedExamType } from "../../types/examType/paginatedExamType.type";

export interface IExamTypeRepository{
    index(page:number,limit:number):Promise<PaginatedExamType>;
    store(createExamType:CreateExamType):Promise<void>;
    show(id:number):Promise<ExamType|null>;
    update(updateExamType:UpdateExamTypeDto):Promise<void>;
}