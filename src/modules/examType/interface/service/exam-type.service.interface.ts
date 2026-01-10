import { ResponseApi } from "src/shared/response/responseApi";
import { CreateExamType } from "../../types/create/createExamType.type";
import { UpdateExamTypeDto } from "../../dto/request/update/updateExamType.dto";

export interface IExamTypeService {
  index(page:number,limit:number,language:string):Promise<ResponseApi>;
  store(createExamType:CreateExamType,language:string):Promise<ResponseApi>;
  show(id:number,language:string):Promise<ResponseApi>;
  update(updateExamType:UpdateExamTypeDto,language:string):Promise<ResponseApi>;
}