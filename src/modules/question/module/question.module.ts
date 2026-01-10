import { Module } from '@nestjs/common';
import { QuestionController } from '../controller/question.controller';
import { QuestionService } from '../service/question.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from '../entity/question.entity';
import { QuestionRepository } from '../repository/question.repository';
import { CacheService } from 'src/shared/utils/cache.util';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, CacheService],
})
export class QuestionModule { }
