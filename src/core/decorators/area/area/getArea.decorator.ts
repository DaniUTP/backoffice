import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { AreaBadRequestDto } from "src/modules/area/dto/response/area/areaBadRequest.dto";
import { AreaOkDto } from "src/modules/area/dto/response/area/areaOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetArea() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Lista todas las áreas',
            description: 'Retorna todas las áreas disponibles en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiQuery({
            name: 'page',
            required: true
        }),
        ApiQuery({
            name: 'limit',
            required: true
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: AreaOkDto
        }),
        ApiBadRequestResponse({
            description: 'Mensaje de error',
            type: AreaBadRequestDto
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