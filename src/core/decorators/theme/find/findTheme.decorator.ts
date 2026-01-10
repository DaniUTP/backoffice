import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { FindThemeBadRequestDto } from "src/modules/theme/dto/response/find/findThemeBadRequest.dto";
import { FindThemeNotFoundDto } from "src/modules/theme/dto/response/find/findThemeNotFound.dto";
import { FindThemeOkDto } from "src/modules/theme/dto/response/find/findThemeOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function FindTheme() {
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
        ApiParam({
            description: "Código del tema",
            name: "code",
            required: true
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: FindThemeOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: FindThemeBadRequestDto
        }),
        ApiNotFoundResponse({
            description: 'Tema no encontrado',
            type: FindThemeNotFoundDto
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