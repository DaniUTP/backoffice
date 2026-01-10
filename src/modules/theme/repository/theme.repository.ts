import { Injectable } from '@nestjs/common';
import { IThemeRepository } from '../interface/repository/theme.repository.interface';
import { Theme } from '../entity/theme.entity';
import { CreateThemeType } from '../types/create/createTheme.type';
import { UpdateThemeType } from '../types/update/updateTheme.type';
import { ManageThemeType } from '../types/manage/manageTheme.type';
import { PaginatedThemeType } from '../types/theme/paginatedTheme.type';
import { col, fn, GroupedCountResultItem } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';
import { Question } from 'src/modules/question/entity/question.entity';

@Injectable()
export class ThemeRepository implements IThemeRepository {
    constructor(
        @InjectModel(Theme) private readonly themeEntity: typeof Theme,
        @InjectModel(Specialty) private readonly specialtyEntity: typeof Specialty,
        @InjectModel(Question) private readonly questionEntity: typeof Question
    ) { }

    async existTheme(theme: string): Promise<number> {
        return await this.themeEntity.count({
            where: {
                theme: theme
            }
        });
    };

    async show(code: string, attributes: Array<string>): Promise<Theme | null> {
        return await this.themeEntity.findOne({
            attributes: attributes,
            where: {
                code: code
            }
        });
    };

    async existThemeByCode(code: string): Promise<number> {
        return await this.themeEntity.count({
            where: {
                code: code
            }
        });
    };

    async index(page: number, limit: number): Promise<PaginatedThemeType> {
        const offset = (page - 1) * limit;
        const result = await this.themeEntity.findAndCountAll({
            attributes: [
                [
                   col('Theme.id_theme'),'id' 
                ],
                'code',
                'theme',
                [
                    col('specialties.specialty'), 'name_specialty'
                ],
                'description',
                'status',
                [
                    fn("COUNT", fn("DISTINCT", col("questions.id_question"))),
                    "count_questions"
                ]
            ],
            include: [
                {
                    model: this.specialtyEntity,
                    as: 'specialties',
                    attributes: [],
                    where: { status: 1 }
                },
                {
                    model: this.questionEntity,
                    as: 'questions',
                    attributes: [],
                    where: { status: 1 }
                }
            ],
            group: [
                'code',
                'theme',
                'specialties.specialty',
                'description',
                'status',
            ],
            subQuery: false,
            offset: offset,
            limit: limit
        });
        const groupedCount: GroupedCountResultItem[] = result.count;
        const totalRows = groupedCount.length;
        const totalPages = Math.ceil(totalRows / limit);
        const body = {
            data: result.rows,
            current_page: page,
            total_pages: totalPages
        };
        return body;
    }

    async store(themeType: CreateThemeType): Promise<void> {
        await this.themeEntity.create({
            code: themeType.code,
            id_specialty: themeType.id_specialty,
            theme: themeType.theme,
            description: themeType.description,
            icon: themeType.icon,
            status: 1
        });
    };

    async update(updateThemeType: UpdateThemeType): Promise<void> {
        await this.themeEntity.update({
            id_specialty: updateThemeType.id_specialty,
            theme: updateThemeType.theme,
            description: updateThemeType.description
        }, {
            where: {
                code: updateThemeType.code
            }
        });
    };

    async manage(manageTheme: ManageThemeType): Promise<void> {
        await this.themeEntity.update({
            status: manageTheme.status
        }, {
            where: {
                code: manageTheme.code
            }
        });
    };

    async allThemes(): Promise<Theme[]> {
        return await this.themeEntity.findAll({
            attributes: [
                [
                    col('id_theme'), 'id'
                ],
                [
                    col('theme'), 'name'
                ]
            ],
            where: {
                status: 1
            }
        });
    }
}
