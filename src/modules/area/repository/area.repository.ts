import { Injectable } from '@nestjs/common';
import { IAreaRepository } from '../interfaces/repository/area.repository.interface';
import { Area } from '../entity/area.entity';
import { CreateAreaType } from '../types/area/request/area.type';
import { PaginatedAreaType } from '../types/area/response/paginatedArea.type';
import { ChangeStatusType } from '../types/changeStatus/changeStatus.type';
import { InjectModel } from '@nestjs/sequelize';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';
import { col, fn } from 'sequelize';
import { UpdateAreaType } from '../types/update/updateArea.type';

@Injectable()
export class AreaRepository implements IAreaRepository {
    constructor(
        @InjectModel(Area) private readonly areaEntity: typeof Area,
        @InjectModel(Specialty) private readonly specialtyEntity: typeof Specialty
    ) { }

    async existArea(code: string): Promise<number> {
        return await this.areaEntity.count({
            where: {
                code: code
            }
        });
    };

    async index(page: number, limit: number): Promise<PaginatedAreaType> {
        const offset = (page - 1) * limit;
        const result = await this.areaEntity.findAndCountAll({
            attributes: [
                'code',
                'area',
                'description',
                'status',
                [
                    fn('COUNT', col('specialties.id_specialty')), 'count_specialties'
                ]
            ],
            include: [{
                attributes: [],
                model: this.specialtyEntity,
                as: 'specialties',
                where: { status: 1 }
            }],
            where: { status: 1 },
            group: ['Area.id_area'],
            limit: limit,
            offset: offset,
            subQuery: false
        });
        const count = Array.isArray(result.count) ? result.count.length : result.count;
        const totalPage = Math.ceil(count / limit);
        const body = {
            data: result.rows,
            current_page: page,
            total_pages: totalPage
        };
        return body;
    };
    async create(area: CreateAreaType): Promise<void> {
        await this.areaEntity.create({
            code: area.code,
            area: area.area,
            description: area.description,
            icon: area.icon,
        });
    };
    async show(attributes: Array<string>, code: string): Promise<Area | null> {
        return await this.areaEntity.findOne({
            attributes: attributes,
            where: {
                code: code
            }
        });
    };
    async changeStatus(body: ChangeStatusType): Promise<void> {
        await this.areaEntity.update({
            status: body.status
        }, {
            where: {
                code: body.code
            }
        });
    };
    async update(body: UpdateAreaType): Promise<void> {
        await this.areaEntity.update({
                area: body.area,
                description: body.description,
                icon: body.icon,
            }, {
                where: {
                    code: body.code
                }
            });
    };
}
