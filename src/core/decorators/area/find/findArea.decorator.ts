import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { FindAreaBadRequestDto } from "src/modules/area/dto/response/find/findAreaBadRequest.dto";
import { FindAreaNotFoundDto } from "src/modules/area/dto/response/find/findAreaNotFound.dto";
import { FindAreaOkDto } from "src/modules/area/dto/response/find/findAreaOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function FindArea() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite buscar un area',
            description: "Busca un area en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiParam({
            name: 'code',
            description: 'Código de la area',
            required: true
        }),
        ApiOkResponse({
            description: "Area creada exitosamente",
            type: FindAreaOkDto
        }),
        ApiBadRequestResponse({
            description: "Mala petición",
            type: FindAreaBadRequestDto
        }),
        ApiNotFoundResponse({
            description: "Area no encontrada",
            type: FindAreaNotFoundDto
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