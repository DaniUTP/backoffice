import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { UpdateThemeDto } from "src/modules/theme/dto/request/update/updateTheme.dto";
import { UpdateThemeBadRequestDto } from "src/modules/theme/dto/response/update/updateThemeBadRequest.dto";
import { UpdateThemeOkDto } from "src/modules/theme/dto/response/update/updateThemeOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function UpdateTheme() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Actualiza un tema',
            description: "Actualiza un tema en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: UpdateThemeDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: UpdateThemeOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: UpdateThemeBadRequestDto
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