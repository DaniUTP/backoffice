import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetYear() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Lista todos los años',
            description: 'Retorna todos los años disponibles en la base de datos',
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