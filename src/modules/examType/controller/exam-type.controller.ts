import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ExamTypeService } from '../service/exam-type.service';
import { Response } from 'express';
import { ExampTypeDto } from '../dto/request/examType/exam-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetExamType } from 'src/core/decorators/examType/examType/getExamType.decorator';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateExamTypeDto } from '../dto/request/create/createExamType.dto';
import { CreateExamType } from 'src/core/decorators/examType/create/createExamType.decorator';
import { FindExamTypeDto } from '../dto/request/find/findExamType.dto';
import { FindExamType } from 'src/core/decorators/examType/find/findExamType.decorator';
import { UpdateExamTypeDto } from '../dto/request/update/updateExamType.dto';
import { UpdateExamType } from 'src/core/decorators/examType/update/updateExamType.decorator';

@ApiTags('Tipos de tema')
@Controller('exam-type')
export class ExamTypeController {
  constructor(private readonly examTypeService: ExamTypeService) { }
  @GetExamType()
  @Get('')
  async examTypes(@Query() query: ExampTypeDto, @Res() response: Response): Promise<Response> {
    const data = await this.examTypeService.index(query.page, query.limit, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @CreateExamType()
  @Post('')
  async createExamType(@Query() query: LanguageDto, @Body() body: CreateExamTypeDto, @Res() response: Response): Promise<Response> {
    const data = await this.examTypeService.store(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @FindExamType()
  @Get(':id')
  async findExamType(@Query() query:LanguageDto, @Param() param:FindExamTypeDto,@Res() response:Response):Promise<Response>
  {
    const data = await this.examTypeService.show(param.id, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @UpdateExamType()
  @Patch('')
  async update(@Query() query:LanguageDto,@Body() body:UpdateExamTypeDto,@Res() response:Response):Promise<Response>
  {
        const data = await this.examTypeService.update(body,query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  
}
