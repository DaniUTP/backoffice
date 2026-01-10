import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interface/repository/auth.repository.interface';
import { AdminUser } from '../entity/adminUser.entity';
import { PersonalAccessToken } from 'src/modules/client/entity/personalAccessToken/personalAccessToken.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PasswordUtil } from 'src/shared/utils/password.util';

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        @InjectModel(AdminUser) private readonly adminUserEntity: typeof AdminUser,
        @InjectModel(PersonalAccessToken) private readonly personalAccessToken: typeof PersonalAccessToken,
    ){}
    
    async findByEmail(email: string,attributes:Array<string>): Promise<AdminUser | null> {
        return await this.adminUserEntity.findOne({
            attributes: attributes,
            where: {
                email: email
            }
        });
    };

   async  createToken(id: number, token: string): Promise<PersonalAccessToken> {
       return await this.personalAccessToken.create({
            tokenable_type: 'AdminUser',
            tokenable_id: id,
            name: 'BackOffice',
            token: await PasswordUtil.hashPassword(token),
            status: 1
        });
   };
}
