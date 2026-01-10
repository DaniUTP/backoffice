import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { UpdateClientDto } from "src/modules/client/dto/request/update/updateClient.dto";
import { UpdateClientBadRequestDto } from "src/modules/client/dto/response/update/updateClientBadRequest.dto";
import { UpdateClientOkDto } from "src/modules/client/dto/response/update/updateClientOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function UpdateClient() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite actualizar un cliente',
            description: "Actualiza un cliente en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({ type: UpdateClientDto }),
        ApiOkResponse({
            type: UpdateClientOkDto,
            description: 'Mensaje de éxito'
        }),
        ApiBadRequestResponse({
            type: UpdateClientBadRequestDto,
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
    );
}