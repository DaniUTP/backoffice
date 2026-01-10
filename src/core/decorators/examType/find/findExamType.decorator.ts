import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function FindExamType() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Encuentra un tipo de examen',
            description: 'Permite encontrar un tipo de examen disponible en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiParam({
            description: "Identificador del tipo de examen",
            name: "id",
            required: true
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito'
        }),
        ApiNotFoundResponse({
            description: "No se encontró el tipo de examen"
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