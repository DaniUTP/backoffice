import { applyDecorators, UseInterceptors } from "@nestjs/common"
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor"
import { CreateClientDto } from "src/modules/client/dto/request/create/createClient.dto"
import { CreateClientBadRequestDto } from "src/modules/client/dto/response/create/createClientBadRequest.dto"
import { CreateClientOkDto } from "src/modules/client/dto/response/create/createClientOk.dto"
import { InternalServerDto } from "src/shared/dto/internalError.dto"
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto"

export function CreateClient() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite registrar un nuevo cliente',
            description: "Registra un nuevo cliente en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({ type: CreateClientDto }),
        ApiCreatedResponse({
            type: CreateClientOkDto,
            description: 'Mensaje de éxito'
        }),
        ApiBadRequestResponse({
            type: CreateClientBadRequestDto,
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