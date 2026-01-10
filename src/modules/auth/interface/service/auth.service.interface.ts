import { ResponseApi } from "src/shared/response/responseApi";
import { LoginType } from "../../type/login/login.type";

export interface IAuthService{
    login(client:LoginType,language:string):Promise<ResponseApi>;
}