import { HttpStatus, Injectable } from '@nestjs/common';
import { IQuestionService } from '../interface/service/question.service.interface';
import { ResponseApi } from 'src/shared/response/responseApi';
import { Logger } from '@nestjs/common';
import { CustomResponse } from 'src/shared/response/customResponse';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionType } from '../types/create/createQuestionType';
import { UpdateQuestionType } from '../types/update/updateQuestionType.type';
import { CacheService } from 'src/shared/utils/cache.util';

@Injectable()
export class QuestionService implements IQuestionService {
    private readonly logger = new Logger(QuestionService.name);
    private readonly customResponse = new CustomResponse();
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly cacheService: CacheService,
    ) { }

    async index(s: string, type: string, theme: number, year: string, page: number, limit: number, language: string): Promise<ResponseApi> {
        try {
            const cacheKey = 'questions-index';
            const subKey = `${s || 's-all'}:${type || 'type-all'}:${theme || 'theme-all'}:${year || 'year-all'}:${page}:${limit}`;
            const cachedResult = this.cacheService.get(cacheKey, subKey);
            if (cachedResult) {
                return this.customResponse.responseBody(cachedResult, HttpStatus.OK);
            };
            const result = await this.questionRepository.index(s, type, theme, year, page, limit);
            this.cacheService.set(cacheKey, subKey, result, {
                ttl: 300,
                maxEntries: 2
            });
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async store(createQuestionType: CreateQuestionType, language: string): Promise<ResponseApi> {
        try {
            const questionCount = await this.questionRepository.existQuestion(createQuestionType.question);
            const errors = { question: "" };
            let hasErrors = false;

            if (questionCount > 0) {
                errors.question = this.customResponse.message('questionExist', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            const result = await this.questionRepository.store(createQuestionType);
            return this.customResponse.responseMessage('createQuestion', language, HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(id: number, language: string): Promise<ResponseApi> {
        try {
            const result = await this.questionRepository.findQuestion(id);
            if (!result) {
                return this.customResponse.responseMessage('notFoundRegister', language, HttpStatus.NOT_FOUND);
            };
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(updateQuestionDto: UpdateQuestionType, language: string): Promise<ResponseApi> {
        try {
            const result = await this.questionRepository.update(updateQuestionDto);
            return this.customResponse.responseMessage('updateQuestion', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    async year(language: string, page: number, limit: number): Promise<ResponseApi> {
        try {
            const result = await this.questionRepository.year(page, limit);
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
