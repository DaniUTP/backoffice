import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { ClientBadRequestDto } from "src/modules/client/dto/response/client/clientBadRequest.dto";
import { PaginatedClientOkDto } from "src/modules/client/dto/response/client/paginatedClientOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetClient() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Retorna todos los usuarios',
            description: "Retorna listado de todos los usuarios de la base de datos"
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
            type: PaginatedClientOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: ClientBadRequestDto
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
    );
}