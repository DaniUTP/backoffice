import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { UpdateAreaDto } from "src/modules/area/dto/request/update/updateArea.dto";
import { UpdateAreaBadRequestDto } from "src/modules/area/dto/response/update/updateAreaBadRequest.dto";
import { UpdateAreaOkDto } from "src/modules/area/dto/response/update/updateAreaOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function UpdateArea() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite actualizar un area',
            description: "Actualiza un area en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: "Body de la petición",
            type: UpdateAreaDto
        }),
        ApiOkResponse({
            description: "Area actualizada exitosamente",
            type: UpdateAreaOkDto
        }),
        ApiBadRequestResponse({
            description: "Mala petición",
            type: UpdateAreaBadRequestDto
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