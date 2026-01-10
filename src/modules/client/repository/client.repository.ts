import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../interface/repository/client.service.repository';
import { Client } from '../entity/client/client.entity';
import { ChangeStatusType } from '../types/changeStatus/changeStatus.type';
import { CreateClientType } from '../types/create/createClient.type';
import { UpdateClientType } from '../types/update/updateClient.type';
import { InjectModel } from '@nestjs/sequelize';
import { PersonalAccessToken } from '../entity/personalAccessToken/personalAccessToken.entity';
import { col } from 'sequelize';
import { PaginatedClientType } from '../types/client/response/paginatedClient.type';
import { PasswordUtil } from 'src/shared/utils/password.util';
import { RandomLetterUtil } from 'src/shared/utils/randomLetter.util';

@Injectable()
export class ClientRepository implements IClientRepository {
    constructor(
        @InjectModel(Client) private readonly clientEntity: typeof Client,
        @InjectModel(PersonalAccessToken) private readonly personalAccessToken: typeof PersonalAccessToken,
    ) { }

    async existUser(email: string): Promise<number> {
        const count = await this.clientEntity.count({
            where: {
                email: email
            }
        });
        return count;
    };
    async existToken(id: number): Promise<number> {
        const countRegister = await this.personalAccessToken.count({
            where: {
                id: id
            }
        });
        return countRegister;
    };
    async index(page: number, limit: number): Promise<PaginatedClientType> {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.clientEntity.findAndCountAll({
            attributes: [
                [
                    col('id_client'), 'id'
                ],
                "name",
                "email",
                "university",
                "status"
            ],
            limit: limit,
            offset: offset
        });
        const totalPage = Math.ceil(count / limit);
        const body = {
            data: rows,
            current_page: page,
            total_pages: totalPage,
            total_items: count
        };
        return body;
    };

    async store(client: CreateClientType): Promise<void> {
        await this.clientEntity.create({
            email: client.email,
            password: await PasswordUtil.hashPassword(client.password),
            name: client.name,
            last_name: client.last_name,
            code_active: RandomLetterUtil.generateRandomLowercase(),
            level: 1,
            phone: client.phone,
            university: client.university,
            social_login: 0,
            status: 1,
        });
    };

    async show(id: number, attributes: Array<string>): Promise<Client | null> {
        return await this.clientEntity.findByPk(id, {
            attributes: attributes
        });
    };

    async update(client: UpdateClientType): Promise<void> {
        await this.clientEntity.update({
            name: client.name,
            last_name: client.last_name,
            phone: client.phone,
            university: client.university,
        }, {
            where: {
                email: client.email
            }
        });
    };

    async changeStatus(client: ChangeStatusType): Promise<void> {
        await this.clientEntity.update({
            status: client.status,
        }, {
            where: {
                email: client.email
            }
        });
    };
}
