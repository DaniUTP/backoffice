import { ResponseApi } from "src/shared/response/responseApi";
import { CreateAreaType } from "../../types/area/request/area.type";
import { ChangeStatusType } from "../../types/changeStatus/changeStatus.type";

export interface IAreaService{
    index(language:string,page:number,limit:number):Promise<ResponseApi>;
    create(language:string,area:CreateAreaType):Promise<ResponseApi>;
    show(language:string,code:string):Promise<ResponseApi>;
    changeStatus(language:string,body:ChangeStatusType):Promise<ResponseApi>;
}