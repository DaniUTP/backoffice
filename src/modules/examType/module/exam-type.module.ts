import { Module } from '@nestjs/common';
import { ExamTypeService } from '../service/exam-type.service';
import { ExamTypeController } from '../controller/exam-type.controller';
import { ExamTypeRepository } from '../repository/exam-type.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExamType } from '../entity/exam-type.entity';

@Module({
  imports:[SequelizeModule.forFeature([ExamType])],
  controllers: [ExamTypeController],
  providers: [ExamTypeService,ExamTypeRepository],
})
export class ExamTypeModule {}
