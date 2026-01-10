import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { FindSpecialtyBadRequestDto } from "src/modules/specialty/dto/response/find/findSpecialtyBadRequest.dto";
import { FindSpecialtyOkDto } from "src/modules/specialty/dto/response/find/findSpecialtyOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function FindSpecialty() {
 return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Encuentra una especialidad',
            description: "Encuentra una especialidad por su código"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiParam({
            description: "Código de la especialidad",
            name: "code"
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: FindSpecialtyOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: FindSpecialtyBadRequestDto
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