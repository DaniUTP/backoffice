import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { CreateThemeDto } from "src/modules/theme/dto/request/create/createTheme.dto";
import { CreateThemeBadRequestDto } from "src/modules/theme/dto/response/create/createThemeBadRequest.dto";
import { CreateThemeOkDto } from "src/modules/theme/dto/response/create/createThemeOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function CreateTheme()
{
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Crea un tema',
            description: "Crea un tema en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: CreateThemeDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: CreateThemeOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: CreateThemeBadRequestDto
        }),
        ApiUnauthorizedResponse({
            description: 'No autorizado',
            type: UnauthorizedDto
        }),
        ApiInternalServerErrorResponse({
            description: 'Error en el servidor',
            type: InternalServerDto
        }),
        UseInterceptors(FormatManyValidationInterceptor)
    )
}