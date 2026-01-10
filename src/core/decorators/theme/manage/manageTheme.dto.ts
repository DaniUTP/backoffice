import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { ManageThemeDto } from "src/modules/theme/dto/request/manage/manageTheme.dto";
import { ManageThemeBadRequestDto } from "src/modules/theme/dto/response/manage/manageThemeBadRequest.dto";
import { ManageThemeOkDto } from "src/modules/theme/dto/response/manage/manageThemeOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function  ManageTheme() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Actualiza el estado del tema',
            description: "Actualiza el estado de un tema en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: ManageThemeDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: ManageThemeOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: ManageThemeBadRequestDto
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