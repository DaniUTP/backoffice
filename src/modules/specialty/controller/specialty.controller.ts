import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { SpecialtyService } from '../service/specialty.service';
import { Response } from 'express';
import { ResponseApi } from 'src/shared/response/responseApi';
import { GetSpecialty } from 'src/core/decorators/specialty/specialty/getSpecialty.decorator';
import { SpecialtyDto } from '../dto/request/specialty/specialty.dto';
import { ApiTags } from '@nestjs/swagger';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateSpecialtyDto } from '../dto/request/create/createSpecialty.dto';
import { CreateSpecialty } from 'src/core/decorators/specialty/create/createSpecialty.decorator';
import { FindSpecialtyDto } from '../dto/request/find/findSpecialty.dto';
import { FindSpecialty } from 'src/core/decorators/specialty/find/findSpecialty.decorator';
import { UpdateSpecialtyDto } from '../dto/request/update/updateSpecialty.dto';
import { UpdateSpecialty } from 'src/core/decorators/specialty/update/updateSpecialty.decorator';
import { ChangeStatusSpecialty } from 'src/core/decorators/specialty/changeStatus/changeStatus.decorator';
import { ChangeStatusSpecialtyDto } from '../dto/request/changeStatus/changeStatusSpecialty.dto';

@ApiTags('Especialidades')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) { }

  @GetSpecialty()
  @Get('')
  async specialties(@Query() query: SpecialtyDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.specialtyService.index(query.page, query.limit, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @CreateSpecialty()
  @Post('')
  async create(@Query() query: LanguageDto, @Body() body: CreateSpecialtyDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.specialtyService.store(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @FindSpecialty()
  @Get(':code')
  async findSpecialty(@Query() query: LanguageDto, @Param() param: FindSpecialtyDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.specialtyService.show(param.code, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @UpdateSpecialty()
  @Patch('')
  async updateSpecialty(@Query() query: LanguageDto, @Body() body: UpdateSpecialtyDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.specialtyService.update(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @ChangeStatusSpecialty()
  @Patch('manage')
  async changeStatus(@Query() query: LanguageDto, @Body() body: ChangeStatusSpecialtyDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.specialtyService.changeStatus(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
}
