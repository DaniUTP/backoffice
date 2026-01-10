import { UpdateSpecialtyType } from "../../types/update/updateSpecialty.type";
import { ChangeStatusSpecialtyType } from "../../types/changeStatus/changeStatusSpecialty.dto";
import { PaginatedSpecialtyType } from "../../types/specialty/response/paginatedSpecialty.type";
import { Specialty } from "../../entity/specialty.entity";
import { CreateSpecialtyType } from "../../types/create/createSpecialty.type";

export interface ISpecialtyRepository {
    index(page:number,limit:number):Promise<PaginatedSpecialtyType>;
    store(specialty:CreateSpecialtyType):Promise<void>;
    show(code:string):Promise<Specialty|null>;
    update(specialty:UpdateSpecialtyType):Promise<void>;
    changeStatus(changeStatus:ChangeStatusSpecialtyType):Promise<void>;
}