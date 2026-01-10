import { CreateClientType } from "../../types/create/createClient.type";
import { UpdateClientType } from "../../types/update/updateClient.type";
import { ChangeStatusType } from "../../types/changeStatus/changeStatus.type";
import { Client } from "../../entity/client/client.entity";
import { PaginatedClientType } from "../../types/client/response/paginatedClient.type";

export interface IClientRepository {
    index(page: number, limit: number): Promise<PaginatedClientType>;
    store(client: CreateClientType): Promise<void>;
    show(id: number,attributes:Array<string>): Promise<Client | null>;
    update(client: UpdateClientType): Promise<void>;
    changeStatus(client: ChangeStatusType): Promise<void>;
}