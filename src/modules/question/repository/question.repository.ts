import { InjectModel } from "@nestjs/sequelize";
import { IQuestionRepository } from "../interface/repository/question.repository.interface";
import { PaginatedQuestionType } from "../types/question/paginatedQuestionType";
import { Question } from "../entity/question.entity";
import { col, fn } from "sequelize";
import { Theme } from "src/modules/theme/entity/theme.entity";
import { CreateQuestionType } from "../types/create/createQuestionType";
import { UpdateQuestionType } from "../types/update/updateQuestionType.type";
import { Op } from "sequelize";

export class QuestionRepository implements IQuestionRepository {
    constructor(
        @InjectModel(Question) private readonly questionEntity: typeof Question,
    ) { }

    async findQuestion(id: number): Promise<Question | null> {
        return await this.questionEntity.findByPk(id, {
            attributes: [
                [
                    col('id_question'), 'id'
                ],
                [
                    col('id_exam_type'), 'exam_type'
                ],
                [
                    col('id_theme'), 'theme'
                ],
                "question",
                "year",
                "image",
                "image_comment",
                "alt_a",
                "alt_b",
                "alt_c",
                "alt_d",
                "alt_e",
                "response",
                "justification",
                "image_justification"
            ]
        });
    };

    async existQuestion(question: string): Promise<number> {
        return await this.questionEntity.count({
            where: {
                question: question
            }
        });
    };

    async index(s: string, type: string, theme: number, year: string, page: number, limit: number): Promise<PaginatedQuestionType> {
        const offset = (page - 1) * limit;
        console.log("Valor del tema: ", theme);
        const { count, rows } = await this.questionEntity.findAndCountAll({
            attributes: [
                [
                    col('id_question'), 'id'
                ],
                [
                    col('id_exam_type'), 'exam_type'
                ],
                [
                    col('theme.theme'), 'theme_name'
                ],
                "question",
                "year",
                "status"
            ],
            include: [{
                model: Theme,
                as: 'theme',
                attributes: []
            }],
            where: {
                ...(s && { question: { [Op.like]: `%${s}%` } }),
                ...(type && { id_exam_type: type }),
                ...(theme && { id_theme: theme }),
                ...(year && { year: year })
            },
            order: [['created_at', 'DESC']],
            limit: limit,
            offset: offset
        });
        const totalPage = Math.ceil(count / limit);
        const body = {
            data: rows,
            current_page: page,
            total_pages: totalPage == 0 ? 1 : totalPage,
        };
        return body;
    };

    async store(createQuestionType: CreateQuestionType): Promise<void> {
        await this.questionEntity.create({
            id_exam_type: createQuestionType.id_exam_type,
            id_theme: createQuestionType.id_theme,
            year: createQuestionType.year,
            question: createQuestionType.question,
            image: createQuestionType.image,
            image_comment: createQuestionType.image_comment,
            alt_a: createQuestionType.alt_a,
            alt_b: createQuestionType.alt_b,
            alt_c: createQuestionType.alt_c,
            alt_d: createQuestionType.alt_d,
            alt_e: createQuestionType.alt_e,
            response: createQuestionType.response,
            justification: createQuestionType.justification,
            image_justification: createQuestionType.image_justification
        })
    };

    async update(updateQuestionDto: UpdateQuestionType): Promise<void> {
        await this.questionEntity.update({
            id_exam_type: updateQuestionDto.exam_type,
            id_theme: updateQuestionDto.theme,
            year: updateQuestionDto.year,
            question: updateQuestionDto.question,
            image: updateQuestionDto.image,
            image_comment: updateQuestionDto.image_comment,
            alt_a: updateQuestionDto.alt_a,
            alt_b: updateQuestionDto.alt_b,
            alt_c: updateQuestionDto.alt_c,
            alt_d: updateQuestionDto.alt_d,
            alt_e: updateQuestionDto.alt_e,
            response: updateQuestionDto.response,
            justification: updateQuestionDto.justification,
            image_justification: updateQuestionDto.image_justification
        }, {
            where: {
                id_question: updateQuestionDto.id
            }
        })
    };
    async year(page: number, limit: number): Promise<PaginatedQuestionType> {
        const offset = (page - 1) * limit;
        const result = await this.questionEntity.findAndCountAll({
            attributes: [
                [col('year'), 'year']
            ],
            group: ['year'],
            order: [[col('year'), 'DESC']],
            limit: limit,
            offset: offset,
            distinct: true,
            col: 'year'
        });

        const totalCount = typeof result.count === 'number' ? result.count :
            Array.isArray(result.count) ? result.count.length : 0;

        const totalPage = Math.ceil(totalCount / limit);

        const body = {
            data: result.rows,
            current_page: page,
            total_pages: totalPage === 0 ? 1 : totalPage
        };
        return body;
    };
}