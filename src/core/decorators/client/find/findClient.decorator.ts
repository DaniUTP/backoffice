import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { FindClientBadRequestDto } from "src/modules/client/dto/response/find/findClientBadRequest.dto";
import { FindClientNotFoundDto } from "src/modules/client/dto/response/find/findClientNotFoundDto";
import { FinClientOkDto } from "src/modules/client/dto/response/find/findClientOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function FindClient() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite buscar un cliente',
            description: "Busca un cliente en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiParam({
            name: 'id',
            description: 'Id del cliente',
            required: true
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: FinClientOkDto
        }),
        ApiBadRequestResponse({
            description: 'Solicitud incorrecta',
            type: FindClientBadRequestDto
        }),
        ApiNotFoundResponse({
            description: 'No encontrado',
            type: FindClientNotFoundDto
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