import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IExamTypeService } from '../interface/service/exam-type.service.interface';
import { ResponseApi } from 'src/shared/response/responseApi';
import { CustomResponse } from 'src/shared/response/customResponse';
import { ExamTypeRepository } from '../repository/exam-type.repository';
import { CreateExamType } from '../types/create/createExamType.type';
import { UpdateExamTypeDto } from '../dto/request/update/updateExamType.dto';

@Injectable()
export class ExamTypeService implements IExamTypeService {
    private readonly logger = new Logger(ExamTypeService.name);
    private readonly customResponse = new CustomResponse();
    constructor(
        private readonly examTypeRepository: ExamTypeRepository
    ) { }

    async index(page: number, limit: number, language: string): Promise<ResponseApi> {
        try {
            const result = await this.examTypeRepository.index(page, limit);
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async store(createExamType: CreateExamType, language: string): Promise<ResponseApi> {
        try {
            const examTypeCount = await this.examTypeRepository.existExamType(createExamType.exam_type);
            const errors = { exam_type: "" };
            let hasErrors = false;

            if (examTypeCount > 0) {
                errors.exam_type = this.customResponse.message('examTypeExist', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.examTypeRepository.store(createExamType);
            return this.customResponse.responseMessage('createExamType', language, HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(id: number, language: string): Promise<ResponseApi> {
        try {
            const examType = await this.examTypeRepository.show(id);
            if (!examType) {
                return this.customResponse.responseMessage('notFoundRegister', language, HttpStatus.NOT_FOUND);
            };
            return this.customResponse.responseBody(examType, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(updateExamType: UpdateExamTypeDto, language: string): Promise<ResponseApi> {
        try {
            const examTypeCount = await this.examTypeRepository.existExamTypeById(updateExamType.id);
            const errors = { exam_type: "" };
            let hasErrors = false;

            if (examTypeCount == 0) {
                errors.exam_type = this.customResponse.message('examTypeNotFound', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.examTypeRepository.update(updateExamType);
            return this.customResponse.responseMessage('updatedExamType', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

}
