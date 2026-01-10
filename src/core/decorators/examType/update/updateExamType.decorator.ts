import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { UpdateExamTypeDto } from "src/modules/examType/dto/request/update/updateExamType.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function UpdateExamType(){
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite actualizar un tipo de examen',
            description: 'Permite actualizar un tipo de examen en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiBody({
            description:"Cuerpo de solicitud",
            type:UpdateExamTypeDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito'
        }),
        ApiNotFoundResponse({
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