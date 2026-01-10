import { Module } from '@nestjs/common';
import { ClientController } from '../controller/client.controller';
import { ClientService } from '../service/client.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from '../entity/client/client.entity';
import { PersonalAccessToken } from '../entity/personalAccessToken/personalAccessToken.entity';
import { ClientFirebase } from '../entity/firebase/clientFirebase.entity';
import { CryptoService } from 'src/modules/auth/service/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClientRepository } from '../repository/client.repository';

@Module({
  imports: [SequelizeModule.forFeature([Client,PersonalAccessToken,ClientFirebase]),JwtModule,ConfigModule],
  controllers: [ClientController],
  providers: [ClientService,CryptoService,ClientRepository]
})
export class ClientModule { }
