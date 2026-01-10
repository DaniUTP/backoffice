import { ResponseApi } from "src/shared/response/responseApi";
import { CreateClientType } from "../../types/create/createClient.type";
import { UpdateClientType } from "../../types/update/updateClient.type";
import { ChangeStatusType } from "../../types/changeStatus/changeStatus.type";

export interface IClientService {
    index(language: string, page: number, limit: number): Promise<ResponseApi>;
    store(client: CreateClientType, language: string): Promise<ResponseApi>;
    show(id:number, language: string): Promise<ResponseApi>;
    update(client: UpdateClientType, language: string): Promise<ResponseApi>;
    changeStatus(client: ChangeStatusType, language: string): Promise<ResponseApi>;
}