import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LanguageDto } from 'src/shared/dto/language.dto';
import { LoginDto } from '../dto/request/login/login.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/shared/response/responseApi';
import { Auth } from 'src/core/decorators/auth/auth.decorator';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Auth()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Query() query: LanguageDto, @Body() body: LoginDto, @Res() response: Response): Promise<Response> {
    const data: ResponseApi = await this.authService.login(body, query.lang);
    return response.status(data.statusCode).json(data.response);
  };
}
