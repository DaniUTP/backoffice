import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ThemeService } from '../service/theme.service';
import { Response } from 'express';
import { ResponseApi } from 'src/shared/response/responseApi';
import { ThemeDto } from '../dto/request/theme/theme.dto';
import { GetTheme } from 'src/core/decorators/theme/theme/getTheme.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateThemeDto } from '../dto/request/create/createTheme.dto';
import { CreateTheme } from 'src/core/decorators/theme/create/createTheme.decorator';
import { FindThemeDto } from '../dto/request/find/findTheme.dto';
import { FindTheme } from 'src/core/decorators/theme/find/findTheme.decorator';
import { UpdateThemeDto } from '../dto/request/update/updateTheme.dto';
import { UpdateTheme } from 'src/core/decorators/theme/update/updateTheme.decorator';
import { ManageThemeDto } from '../dto/request/manage/manageTheme.dto';
import { ManageTheme } from 'src/core/decorators/theme/manage/manageTheme.dto';
import { GetThemeOption } from 'src/core/decorators/theme/option/themeOption.dto';


@ApiTags("Temas")
@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) { }

  @GetThemeOption()
  @Get('option')
  async themesList(@Query() query: LanguageDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.allThemes(query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @GetTheme()
  @Get('')
  async themes(@Query() query: ThemeDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.index(query.page, query.limit, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @CreateTheme()
  @Post()
  async create(@Query() query: LanguageDto, @Body() body: CreateThemeDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.store(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @FindTheme()
  @Get(':code')
  async find(@Query() query: LanguageDto, @Param() param: FindThemeDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.show(param.code, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @UpdateTheme()
  @Patch('')
  async update(@Query() query: LanguageDto, @Body() body: UpdateThemeDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.update(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
  @ManageTheme()
  @Patch('manage')
  async manage(@Query() query: LanguageDto, @Body() body: ManageThemeDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.themeService.manage(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
}
