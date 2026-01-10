import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { PaginatedSpecialtyOkDto } from "src/modules/specialty/dto/response/specialty/paginatedSpecialtyOk.dto";
import { SpecialtyBadRequestDto } from "src/modules/specialty/dto/response/specialty/specialtyBadRequest.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function GetSpecialty()
{
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Retorna las especialidades',
            description: "Retorna listado de todas las especialidades de la base de datos"
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
            type: PaginatedSpecialtyOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: SpecialtyBadRequestDto
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