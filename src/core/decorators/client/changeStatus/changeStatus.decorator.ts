import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { ChangeStatusClientDto } from "src/modules/client/dto/request/changeStatus/changeStatusClient.dto";
import { ChangeStatusClientBadRequestDto } from "src/modules/client/dto/response/changeStatus/changeStatusClientBadRequest.dto";
import { ChangeStatusClientOkDto } from "src/modules/client/dto/response/changeStatus/changeStatusClientOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function ChangeStatus() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite cambiar el estado de un cliente',
            description: "Cambia el estado de un cliente en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({ type: ChangeStatusClientDto }),
        ApiOkResponse({
            type: ChangeStatusClientOkDto,
            description: 'Mensaje de éxito'
        }),
        ApiBadRequestResponse({
            type: ChangeStatusClientBadRequestDto,
            description: 'Error en la solicitud'
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