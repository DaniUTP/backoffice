import { Module } from '@nestjs/common';
import { AreaService } from '../service/area.service';
import { AreaController } from '../controller/area.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Area } from '../entity/area.entity';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';
import { Theme } from 'src/modules/theme/entity/theme.entity';
import { AreaRepository } from '../repository/area.repository';

@Module({
  imports:[SequelizeModule.forFeature([Area,Specialty,Theme])],
  controllers: [AreaController],
  providers: [AreaService,AreaRepository],
})
export class AreaModule {}
