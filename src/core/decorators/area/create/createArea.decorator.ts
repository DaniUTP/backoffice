import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { CreateAreaDto } from "src/modules/area/dto/request/create/createArea.dto";
import { CreateAreaBadRequestDto } from "src/modules/area/dto/response/create/createAreaBadRequest.dto";
import { CreateAreaCreatedDto } from "src/modules/area/dto/response/create/createAreaCreated.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";

export function CreateArea() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Permite crear un area',
            description: "Crea un area en la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            description: 'Cuerpo de la solicitud',
            type: CreateAreaDto
        }),
        ApiCreatedResponse({
            description: "Area creada exitosamente",
            type: CreateAreaCreatedDto
        }),
        ApiBadRequestResponse({
            description: "Mala petición",
            type: CreateAreaBadRequestDto
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