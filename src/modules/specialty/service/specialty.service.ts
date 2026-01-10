import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ISpecialtyService } from '../interface/service/specialty.service.interface';
import { ResponseApi } from 'src/shared/response/responseApi';
import { CustomResponse } from 'src/shared/response/customResponse';
import { UpdateSpecialtyType } from '../types/update/updateSpecialty.type';
import { ChangeStatusSpecialtyType } from '../types/changeStatus/changeStatusSpecialty.dto';
import { SpecialtyRepository } from '../repository/specialty.repository';
import { CreateSpecialtyType } from '../types/create/createSpecialty.type';

@Injectable()
export class SpecialtyService implements ISpecialtyService {
    private readonly customResponse = new CustomResponse();
    private readonly logger = new Logger(SpecialtyService.name);
    constructor(
        private readonly specialtyRepository: SpecialtyRepository
    ) { }

    async index(page: number, limit: number, language: string): Promise<ResponseApi> {
        try {
            const body = await this.specialtyRepository.index(page, limit);
            return this.customResponse.responseBody(body, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async store(specialtyType: CreateSpecialtyType, language: string): Promise<ResponseApi> {
        try {
            const specialtyCount = await this.specialtyRepository.existSpecialty(specialtyType.specialty);
            const errors = { specialty: "" };
            let hasErrors = false;

            if (specialtyCount > 0) {
                errors.specialty = this.customResponse.message('specialtyExist', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.specialtyRepository.store(specialtyType);
            return this.customResponse.responseMessage('register', language, HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(code: string, language: string): Promise<ResponseApi> {
        try {
            const specialty = await this.specialtyRepository.show(code);
            if (!specialty) {
                return this.customResponse.responseMessage('notFoundRegister', language, HttpStatus.NOT_FOUND);
            };
            return this.customResponse.responseBody(specialty, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(specialty: UpdateSpecialtyType, language: string): Promise<ResponseApi> {
        try {
            const specialtyCount = await this.specialtyRepository.existSpecialty(specialty.specialty);
            const errors = { specialty: "" };
            let hasErrors = false;

            if (specialtyCount == 0) {
                errors.specialty = this.customResponse.message('notFoundRegister', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.specialtyRepository.update(specialty);
            return this.customResponse.responseMessage('update', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async changeStatus(changeStatus: ChangeStatusSpecialtyType, language: string): Promise<ResponseApi> {
        try {
            const specialtyCount = await this.specialtyRepository.existSpecialtyByCode(changeStatus.code);

            if (specialtyCount == 0) {
                return this.customResponse.responseMessage('notFoundRegister', language, HttpStatus.NOT_FOUND);
            };
            await this.specialtyRepository.changeStatus(changeStatus);
            return this.customResponse.responseMessage('update', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}