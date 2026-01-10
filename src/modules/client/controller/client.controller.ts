import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { ResponseApi } from 'src/shared/response/responseApi';
import { Response } from 'express';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { CreateClientDto } from '../dto/request/create/createClient.dto';
import { ClientsDto } from '../dto/request/client/clients.dto';
import { UpdateClientDto } from '../dto/request/update/updateClient.dto';
import { ChangeStatusClientDto } from '../dto/request/changeStatus/changeStatusClient.dto';
import { GetClient } from 'src/core/decorators/client/client/getClient.decorator';
import { CreateClient } from 'src/core/decorators/client/create/createClient.decorator';
import { UpdateClient } from 'src/core/decorators/client/update/updateClient.decorator';
import { ChangeStatus } from 'src/core/decorators/client/changeStatus/changeStatus.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FindClient } from 'src/core/decorators/client/find/findClient.decorator';
import { FindClientDto } from '../dto/request/find/findClient.dto';

@ApiTags('Clientes')
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @GetClient()
  @Get()
  async getClients(@Query() query: ClientsDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.clientService.index(query.lang, query.page, query.limit);
    return response.status(data.statusCode).json(data.response);
  };

  @CreateClient()
  @Post()
  async saveClient(@Query() query: LanguageDto, @Body() body: CreateClientDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.clientService.store(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @FindClient()
  @Get(':id')
  async findClient(@Query() query: LanguageDto, @Param() param: FindClientDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.clientService.show(param.id, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @UpdateClient()
  @Patch('')
  async updateClient(@Query() query: LanguageDto, @Body() body: UpdateClientDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.clientService.update(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };

  @ChangeStatus()
  @Patch('manage')
  async changeStatus(@Query() query: LanguageDto, @Body() body: ChangeStatusClientDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.clientService.changeStatus(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
}
