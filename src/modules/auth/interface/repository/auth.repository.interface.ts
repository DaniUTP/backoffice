import { PersonalAccessToken } from 'src/modules/client/entity/personalAccessToken/personalAccessToken.entity';
import { AdminUser } from '../../entity/adminUser.entity';

export interface IAuthRepository {
    findByEmail(email:string,attributes:Array<string>):Promise<AdminUser|null>;
    createToken(id:number,token:string):Promise<PersonalAccessToken>;
}
