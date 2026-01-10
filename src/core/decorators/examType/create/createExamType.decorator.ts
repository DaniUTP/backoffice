import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { CreateExamTypeDto } from "src/modules/examType/dto/request/create/createExamType.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function CreateExamType(){
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite registrar un tipo de examen',
            description: 'Permite registrar un nuevo tipo de examen en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiBody({
            description:"Cuerpo de solicitud",
            type:CreateExamTypeDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito'
        }),
        ApiConflictResponse({
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
        UseInterceptors(FormatManyValidationInterceptor)
    )
}