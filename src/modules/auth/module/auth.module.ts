import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from '../service/crypto.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminUser } from '../entity/adminUser.entity';
import { PersonalAccessToken } from 'src/modules/client/entity/personalAccessToken/personalAccessToken.entity';
import { AuthRepository } from '../repository/auth.repository';

@Module({
  imports: [SequelizeModule.forFeature([AdminUser, PersonalAccessToken]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, CryptoService,AuthRepository],
})
export class AuthModule { }
