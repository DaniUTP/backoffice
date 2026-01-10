import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetQuestion() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Lista todas las preguntas',
            description: 'Retorna todas las preguntas disponibles en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiQuery({
            name: 'type',
            required: false
        }),
        ApiQuery({
            name: 'theme',
            required: false
        }),
        ApiQuery({
            name: 'year',
            required: false
        }),
        ApiQuery({
            name: 's',
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
            description: 'Mensaje de éxito'
        }),
        ApiBadRequestResponse({
            description: 'Mensaje de error'
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