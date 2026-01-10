import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FormatSingleValidationInterceptor } from "src/core/interceptor/format-single-validation.interceptor";
import { ChangeStatusAreaDto } from "src/modules/area/dto/request/changeStatus/changeStatusArea.dto";
import { ChangeStatusAreaOkDto } from "src/modules/area/dto/response/changeStatus/changeStatusAreaOk.dto";
import { ChangeStatusAreaBadRequestDto } from "src/modules/area/dto/response/changeStatus/changeStatusAreaBadRequest.dto";
import { InternalServerDto } from "src/shared/dto/internalError.dto";
import { UnauthorizedDto } from "src/shared/dto/unauthorized.dto";
import { ChangeStatusAreaNotFoundDto } from "src/modules/area/dto/response/changeStatus/changeStatusAreaNotFound.dto";

export function ChangeStatusArea() {
    return applyDecorators(
        ApiSecurity('JWT-auth'),
        ApiOperation({
            summary: 'Cambio de estado de una área',
            description: 'Cambia el estado de una área en la base de datos',
        }),
        ApiQuery({
            name: 'lang',
            required: false
        }),
        ApiBody({
            description: 'Cambio de estado de una área',
            type: ChangeStatusAreaDto
        }),
        ApiOkResponse({
            description: 'Mensaje de éxito',
            type: ChangeStatusAreaOkDto
        }),
        ApiBadRequestResponse({
            description: 'Mensaje de error',
            type: ChangeStatusAreaBadRequestDto
        }),
        ApiNotFoundResponse({
            description: 'Mensaje de error',
            type: ChangeStatusAreaNotFoundDto
        }),
        ApiUnauthorizedResponse({
            description: 'No autorizado',
            type: UnauthorizedDto
        }),
        ApiInternalServerErrorResponse({
            description: 'Error en el servidor',
            type: InternalServerDto
        }),
        UseInterceptors(FormatSingleValidationInterceptor)
    )
}