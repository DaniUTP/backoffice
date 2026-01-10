import { Module } from '@nestjs/common';
import { ThemeService } from '../service/theme.service';
import { ThemeController } from '../controller/theme.controller';
import { Theme } from '../entity/theme.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';
import { Question } from 'src/modules/question/entity/question.entity';
import { ThemeRepository } from '../repository/theme.repository';

@Module({
  imports: [SequelizeModule.forFeature([Theme,Specialty,Question])],
  controllers: [ThemeController],
  providers: [ThemeService,ThemeRepository],
})
export class ThemeModule {}
