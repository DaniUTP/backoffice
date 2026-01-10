import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { PaginatedThemeOkDto } from "src/modules/theme/dto/response/theme/paginatedThemeOk.dto";
import { ThemeBadRequestDto } from "src/modules/theme/dto/response/theme/themeBadRequest.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetTheme()
{
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Retorna el tema',
            description: "Retorna el tema de la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiQuery({
            name: 'page',
            description: 'Pagina',
            required: true
        }),
        ApiQuery({
            name: 'limit',
            description: 'Limite',
            required: true
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: PaginatedThemeOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: ThemeBadRequestDto
        }),
        ApiUnauthorizedResponse({
            description: 'No autorizado',
            type: UnauthorizedDto
        }),
        ApiInternalServerErrorResponse({
            description: 'Error en el servidor',
            type: InternalServerDto
        }),
        UseInterceptors(FormatSingleValidationInterceptor)
    )
}