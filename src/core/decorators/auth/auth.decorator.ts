import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTooManyRequestsResponse } from "@nestjs/swagger";
import { FormatManyValidationInterceptor } from "src/core/interceptor/format-many-validation.interceptor";
import { LoginDto } from "src/modules/auth/dto/request/login/login.dto";
import { LoginBadRequestDto } from "src/modules/auth/dto/response/login/loginBadRequest.dto";
import { LoginOkDto } from "src/modules/auth/dto/response/login/loginOk.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { RatelimitDto } from "src/shared/dto/ratelimit.dto";

export function Auth() {
    return applyDecorators(
        ApiOperation({
            summary: 'Permite autenticar un usuario',
            description: "Autentica un usuario de la base de datos"
        }),
        ApiQuery({
            name: 'lang',
            description: 'Idioma',
            required: false
        }),
        ApiBody({
            type: LoginDto
        }),
        ApiOkResponse({
            description: "Usuario logueado exitosamente",
            type: LoginOkDto
        }),
        ApiBadRequestResponse({
            description: "Error en la solicitud",
            type: LoginBadRequestDto
        }),
        ApiTooManyRequestsResponse({
            description: "Error en la solicitud",
            type: RatelimitDto
        }),
        ApiInternalServerErrorResponse({
            description: "Error interno del servidor",
            type: InternalServerDto
        }),
        UseInterceptors(FormatManyValidationInterceptor)
    )
}