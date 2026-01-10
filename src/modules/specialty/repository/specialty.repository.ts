import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specialty } from '../entity/specialty.entity';
import { Area } from 'src/modules/area/entity/area.entity';
import { Theme } from 'src/modules/theme/entity/theme.entity';
import { ISpecialtyRepository } from '../interface/repository/specialty.repository.interface';
import { ChangeStatusSpecialtyType } from '../types/changeStatus/changeStatusSpecialty.dto';
import { CreateSpecialtyType } from '../types/create/createSpecialty.type';
import { PaginatedSpecialtyType } from '../types/specialty/response/paginatedSpecialty.type';
import { UpdateSpecialtyType } from '../types/update/updateSpecialty.type';
import { col, fn, GroupedCountResultItem } from 'sequelize';

@Injectable()
export class SpecialtyRepository implements ISpecialtyRepository {
    constructor(
        @InjectModel(Specialty) private readonly specialtyEntity: typeof Specialty,
        @InjectModel(Area) private readonly areaEntity: typeof Area,
        @InjectModel(Theme) private readonly themeEntity: typeof Theme,
    ) { }

    async existSpecialty(specialty: string): Promise<number> {
        return await this.specialtyEntity.count({
            where: {
                specialty: specialty
            }
        });
    };
    async existSpecialtyByCode(code: string): Promise<number> {
        return await this.specialtyEntity.count({
            where: {
                code: code
            }
        });
    };

    async index(page: number, limit: number): Promise<PaginatedSpecialtyType> {
        const offset = (page - 1) * limit;
        const result = await this.themeEntity.findAndCountAll({
            attributes: [
                [
                    col("specialties.code"), 'code'
                ],
                [
                    col("specialties.specialty"), 'specialty'
                ],
                [
                    col("specialties.areas.area"), "name_area"
                ],
                [
                    col("specialties.description"), 'description'
                ],
                [
                    col("specialties.status"), 'status'
                ],
                [
                    fn("COUNT", fn("DISTINCT", col("Theme.id_theme"))),
                    "count_themes"
                ]
            ],
            include: [
                {
                    model: this.specialtyEntity,
                    as: "specialties",
                    attributes: [],
                    include: [{
                        model: this.areaEntity,
                        as: 'areas',
                        attributes: [],
                        where: { status: 1 }
                    }]
                },
            ],
            where: { status: 1 },
            group: [
                "specialties.code",
                "specialties.specialty",
                "specialties.areas.area",
                "specialties.description",
                "specialties.status"
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
            total_pages: totalPages,
        };
        return body;
    };

    async store(specialty: CreateSpecialtyType): Promise<void> {
        await this.specialtyEntity.create({
            id_area: specialty.id_area,
            specialty: specialty.specialty,
            code: specialty.code,
            description: specialty.description,
            icon: specialty.icon,
            status: 1,
        });
    };

    async show(code: string): Promise<Specialty | null> {
        return await this.specialtyEntity.findOne({
            attributes: [
                'code',
                'specialty',
                [
                    col("areas.id_area"), "area_id"
                ],
                [
                    col("areas.area"), "name_area"
                ],
                'description',
                'icon'
            ],
            include: [
                {
                    model: this.areaEntity,
                    as: 'areas',
                    attributes: [],
                    where: { status: 1 }
                }
            ],
            where: {
                code: code,
                status: 1
            }
        });
    };

    async update(specialty: UpdateSpecialtyType): Promise<void> {
        await this.specialtyEntity.update({
            id_area: specialty.area_id,
            specialty: specialty.specialty,
            description: specialty.description,
            icon: specialty.icon,
        }, {
            where: {
                code: specialty.code
            }
        });
    };

    async changeStatus(changeStatus: ChangeStatusSpecialtyType): Promise<void> {
        await this.specialtyEntity.update({
            status: changeStatus.status
        }, {
            where: {
                code: changeStatus.code
            }
        });
    };
}
