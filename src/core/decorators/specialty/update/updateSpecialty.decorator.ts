import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { UpdateSpecialtyDto } from "src/modules/specialty/dto/request/update/updateSpecialty.dto";
import { UpdateSpecialtyBadRequestDto } from "src/modules/specialty/dto/response/update/updateSpecialtyBadRequest.dto";
import { UpdateSpecialtyOkDto } from "src/modules/specialty/dto/response/update/updateSpecialtyOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function UpdateSpecialty()
{
    return applyDecorators(
         ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Actualiza una especialidad',
            description: "Actualiza una especialidad en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: UpdateSpecialtyDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: UpdateSpecialtyOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: UpdateSpecialtyBadRequestDto
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