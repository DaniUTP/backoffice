import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { CreateSpecialtyDto } from "src/modules/specialty/dto/request/create/createSpecialty.dto";
import { CreateSpecialtyBadRequestDto } from "src/modules/specialty/dto/response/create/createSpecialtyBadRequest.dto";
import { CreateSpecialtyOkDto } from "src/modules/specialty/dto/response/create/createSpecialtyOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function CreateSpecialty(){
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Guarda una especialidad',
            description: "Guarda una especialidad en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: CreateSpecialtyDto
        }),
        ApiCreatedResponse({
            description: 'Mensaje de éxito',
            type: CreateSpecialtyOkDto
        }),
        ApiBadRequestResponse({
            description: 'Error en la solicitud',
            type: CreateSpecialtyBadRequestDto
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