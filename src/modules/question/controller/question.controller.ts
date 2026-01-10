import { Response } from 'express';
import { QuestionService } from '../service/question.service';
import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { QuestionDto } from '../dto/request/question/question.dto';
import { GetQuestion } from 'src/core/decorators/question/question/getQuestion.decorator';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateQuestionDto } from '../dto/request/create/createQuestion.dto';
import { CreateQuestion } from 'src/core/decorators/question/create/createQuestion.decorator';
import { FindQuestionDto } from '../dto/request/find/FindQuestionDto.dto';
import { ShowQuestion } from 'src/core/decorators/question/find/showQuestion.decorator';
import { UpdateQuestionDto } from '../dto/request/update/updateQuestion.dto';
import { UpdateQuestion } from 'src/core/decorators/question/update/updateQuestion.decorator';
import { Throttle } from '@nestjs/throttler';
import { GetYear } from 'src/core/decorators/question/year/getYear.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @GetQuestion()
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Get('')
  async questions(@Query() query: QuestionDto, @Res() response: Response): Promise<Response> {
    const data = await this.questionService.index(query.s, query.type, query.theme, query.year, query.page, query.limit, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @GetYear()
  @Get('year')
  async year(@Query() query: QuestionDto, @Res() response: Response): Promise<Response> {
    const data = await this.questionService.year(query.lang, query.page, query.limit);
    return response.status(data.statusCode).json(data.response);
  };

  @CreateQuestion()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async createQuestion(@Query() query: LanguageDto, @Body() body: CreateQuestionDto, @Res() response: Response): Promise<Response> {
    const data = await this.questionService.store(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @ShowQuestion()
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Get(':id')
  async showQuestion(@Query() query: LanguageDto, @Param() param: FindQuestionDto, @Res() response: Response): Promise<Response> {
    const data = await this.questionService.show(param.id, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @UpdateQuestion()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put()
  async updateQuestion(@Query() query: LanguageDto, @Body() body: UpdateQuestionDto, @Res() response: Response): Promise<Response> {
    const data = await this.questionService.update(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
}
