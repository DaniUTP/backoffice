import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody,ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse, ApiSecurity } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { ChangeStatusSpecialtyDto } from "src/modules/specialty/dto/request/changeStatus/changeStatusSpecialty.dto";
import { ChangeStatusSpecialtyBadRequestDto } from "src/modules/specialty/dto/response/changeStatus/changeStatusSpecialtyBadRequest.dto";
import { ChangeStatusSpecialtyOkDto } from "src/modules/specialty/dto/response/changeStatus/changeStatusSpecialtyOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function ChangeStatusSpecialty()
{
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Cambia el estado de una especialidad',
            description: "Cambia el estado de una especialidad en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: ChangeStatusSpecialtyDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: ChangeStatusSpecialtyOkDto
        }),
        ApiBadRequestResponse({
            description: 'Mala petición',
            type: ChangeStatusSpecialtyBadRequestDto
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