import { Injectable } from '@nestjs/common';
import { IExamTypeRepository } from '../interface/repository/exam-type,repository.interface';
import { PaginatedExamType } from '../types/examType/paginatedExamType.type';
import { InjectModel } from '@nestjs/sequelize';
import { ExamType } from '../entity/exam-type.entity';
import { CreateExamType } from '../types/create/createExamType.type';
import { col } from 'sequelize';
import { UpdateExamTypeDto } from '../dto/request/update/updateExamType.dto';

@Injectable()
export class ExamTypeRepository implements IExamTypeRepository {
    constructor(
        @InjectModel(ExamType) private readonly examTypeEntity: typeof ExamType
    ) { }

    async existExamType(examType: string): Promise<number> {
        return await this.examTypeEntity.count({
            where: {
                exam_type: examType
            }
        });
    };
    
    async existExamTypeById(id: number): Promise<number> {
        return await this.examTypeEntity.count({
            where: {
                id_exam_type: id
            }
        });
    };

    async index(page: number, limit: number): Promise<PaginatedExamType> {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.examTypeEntity.findAndCountAll({
            attributes: [
                [
                    col('id_exam_type'),'id'
                ],
                 'exam_type'
                ],
            limit: limit,
            offset: offset
        });
        const totalPages = Math.ceil(count / limit);
        const body = {
            data: rows,
            current_page: page,
            total_pages: totalPages == 0 ? 1 : totalPages
        };
        return body;
    };
    async store(createExamType: CreateExamType): Promise<void> {
        await this.examTypeEntity.create({
            exam_type: createExamType.exam_type
        });
    };

    async show(id: number): Promise<ExamType | null> {
        return await this.examTypeEntity.findByPk(id, {
            attributes: [
                [
                    col('id_exam_type'), 'id'
                ],
                [
                    col('exam_type'), 'name'
                ]
            ]
        });
    };
    
    async update(updateExamType: UpdateExamTypeDto): Promise<void> {
        await this.examTypeEntity.update({
            exam_type:updateExamType.exam_type
        },{
            where:{
                id_exam_type:updateExamType.id
            }
        });
    };
}
