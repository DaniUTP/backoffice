import { CreateAreaType } from "../../types/area/request/area.type";
import { ChangeStatusType } from "../../types/changeStatus/changeStatus.type";
import { Area } from "../../entity/area.entity";
import { PaginatedAreaType } from "../../types/area/response/paginatedArea.type";
import { UpdateAreaType } from "../../types/update/updateArea.type";

export interface IAreaRepository {
    index(page: number, limit: number): Promise<PaginatedAreaType>;
    create(area: CreateAreaType): Promise<void>;
    show(attributes:Array<string>,code: string): Promise<Area|null>;
    update(body: UpdateAreaType): Promise<void>;
    changeStatus(body: ChangeStatusType): Promise<void>;
}