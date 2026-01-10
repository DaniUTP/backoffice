import { Module } from '@nestjs/common';
import { SpecialtyService } from '../service/specialty.service';
import { SpecialtyController } from '../controller/specialty.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialty } from '../entity/specialty.entity';
import { Theme } from 'src/modules/theme/entity/theme.entity';
import { Area } from 'src/modules/area/entity/area.entity';
import { SpecialtyRepository } from '../repository/specialty.repository';

@Module({
  imports: [SequelizeModule.forFeature([Specialty, Theme,Area])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService,SpecialtyRepository],
})
export class SpecialtyModule { }
