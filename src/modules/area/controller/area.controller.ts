import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { AreaService } from '../service/area.service';
import { ResponseApi } from 'src/shared/response/responseApi';
import { Response } from 'express';
import { AreaDto } from '../dto/request/area/area.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetArea } from 'src/core/decorators/area/area/getArea.decorator';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateAreaDto } from '../dto/request/create/createArea.dto';
import { CreateArea } from 'src/core/decorators/area/create/createArea.decorator';
import { FindAreaDto } from '../dto/request/find/findArea.dto';
import { FindArea } from 'src/core/decorators/area/find/findArea.decorator';
import { ChangeStatusAreaDto } from '../dto/request/changeStatus/changeStatusArea.dto';
import { UpdateAreaDto } from '../dto/request/update/updateArea.dto';
import { UpdateArea } from 'src/core/decorators/area/update/updateArea.decorator';
import { ChangeStatusArea } from 'src/core/decorators/area/changeStatus/changeStatus.decorator';

@ApiTags('Areas')

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @GetArea()
  @Get('')
  async getAreas(@Query() query: AreaDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.areaService.index(query.lang, query.page, query.limit);
    return response.status(data.statusCode).json(data.response);
  };
  
  @CreateArea()
  @Post('')
  async createArea(@Query() query: LanguageDto, @Body() body: CreateAreaDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.areaService.create(query.lang, body);
    return response.status(data.statusCode).json(data.response);
  };
  @FindArea()
  @Get(':code')
  async findArea(@Query() query: LanguageDto,@Param() param:FindAreaDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.areaService.show(query.lang, param.code);
    return response.status(data.statusCode).json(data.response);
  };
  @ChangeStatusArea()
  @Patch('manage')
  async changeStatus(@Query() query: LanguageDto, @Body() body: ChangeStatusAreaDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.areaService.changeStatus(query.lang, body);
    return response.status(data.statusCode).json(data.response);
  };
  @UpdateArea()
  @Patch('')
  async updateArea(@Query() query: LanguageDto, @Body() body: UpdateAreaDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.areaService.update(query.lang, body);
    return response.status(data.statusCode).json(data.response);
  };
}
