import { ResponseApi } from "src/shared/response/responseApi";
import { UpdateSpecialtyType } from "../../types/update/updateSpecialty.type";
import { ChangeStatusSpecialtyType } from "../../types/changeStatus/changeStatusSpecialty.dto";
import { CreateSpecialtyType } from "../../types/create/createSpecialty.type";

export interface ISpecialtyService {
    index(page:number,limit:number,language:string):Promise<ResponseApi>;
    store(specialty:CreateSpecialtyType,language:string):Promise<ResponseApi>;
    show(code:string,language:string):Promise<ResponseApi>;
    update(specialty:UpdateSpecialtyType,language:string):Promise<ResponseApi>;
    changeStatus(changeStatus:ChangeStatusSpecialtyType,language:string):Promise<ResponseApi>;
}