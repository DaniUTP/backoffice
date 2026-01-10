import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IAreaService } from '../interfaces/service/area.service.interface';
import { ResponseApi } from 'src/shared/response/responseApi';
import { CustomResponse } from 'src/shared/response/customResponse';
import { CreateAreaType } from '../types/area/request/area.type';
import { ChangeStatusType } from '../types/changeStatus/changeStatus.type';
import { UpdateAreaType } from '../types/update/updateArea.type';
import { AreaRepository } from '../repository/area.repository';

@Injectable()
export class AreaService implements IAreaService {
    private readonly logger = new Logger(AreaService.name);
    private readonly customResponse = new CustomResponse();
    constructor(
        private readonly areaRepository: AreaRepository,
    ) { }

    async index(language: string, page: number, limit: number): Promise<ResponseApi> {
        try {
            const body = await this.areaRepository.index(page, limit);
            return this.customResponse.responseBody(body, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async create(language: string, area: CreateAreaType): Promise<ResponseApi> {
        try {
            const foundArea = await this.areaRepository.existArea(area.code);
            const errors: Record<string, string> = {};
            let hasErrors = false;

            if (foundArea > 0) {
                errors.area = this.customResponse.message('areaExist', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.areaRepository.create(area);
            return this.customResponse.responseMessage('register', language, HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(language: string, code: string): Promise<ResponseApi> {
        try {
            const foundArea = await this.areaRepository.show(['code', 'area', 'description', 'icon'], code);
            if (!foundArea) {
                return this.customResponse.responseMessage('areaNotFound', language, HttpStatus.NOT_FOUND);
            };
            return this.customResponse.responseBody(foundArea, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async changeStatus(language: string, body: ChangeStatusType): Promise<ResponseApi> {
        try {
            const foundArea = await this.areaRepository.existArea(body.code);
            if (foundArea === 0) {
                return this.customResponse.responseMessage('areaNotFound', language, HttpStatus.NOT_FOUND);
            }
            await this.areaRepository.changeStatus(body);
            return this.customResponse.responseMessage('statusUpdated', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(language: string, body: UpdateAreaType): Promise<ResponseApi> {
        try {
            const foundArea = await this.areaRepository.existArea(body.code);
            const errors: Record<string, string> = {};
            let hasErrors = false;

            if (foundArea === 0) {
                errors.area = this.customResponse.message('areaNotFound', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.areaRepository.update(body);
            return this.customResponse.responseMessage('updatedArea', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
