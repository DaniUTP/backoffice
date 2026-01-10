import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CustomResponse } from 'src/shared/response/customResponse';
import { ResponseApi } from 'src/shared/response/responseApi';
import { IThemeService } from '../interface/service/theme.service.interface';
import { CreateThemeType } from '../types/create/createTheme.type';
import { UpdateThemeType } from '../types/update/updateTheme.type';
import { ManageThemeType } from '../types/manage/manageTheme.type';
import { ThemeRepository } from '../repository/theme.repository';

@Injectable()
export class ThemeService implements IThemeService {
    private readonly logger = new Logger(ThemeService.name);
    private readonly customResponse = new CustomResponse();
    constructor(
        private readonly themeRepository: ThemeRepository
    ) { }

    async index(page: number, limit: number, language: string): Promise<ResponseApi> {
        try {
            const result = await this.themeRepository.index(page, limit);
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async store(themeType: CreateThemeType, language: string): Promise<ResponseApi> {
        try {
            const themeCount = await this.themeRepository.existTheme(themeType.theme);
            const errors = { theme: "" };
            let hasErrors = false;

            if (themeCount > 0) {
                errors.theme = this.customResponse.message('themeAlreadyExists', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.themeRepository.store(themeType);
            return this.customResponse.responseMessage('createdTheme', language, HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(code: string, language: string): Promise<ResponseApi> {
        try {
            const theme = await this.themeRepository.show(code, [
                'code',
                'id_specialty',
                'theme',
                'description'
            ]);

            if (!theme) {
                return this.customResponse.responseMessage('themeNotFound', language, HttpStatus.NOT_FOUND);
            };

            return this.customResponse.responseBody(theme, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(updateThemeType: UpdateThemeType, language: string): Promise<ResponseApi> {
        try {
            const themeCount = await this.themeRepository.existThemeByCode(updateThemeType.code);
            const errors = { theme: "" };
            let hasErrors = false;

            if (themeCount == 0) {
                errors.theme = this.customResponse.message('themeNotFound', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };

            await this.themeRepository.update(updateThemeType);
            return this.customResponse.responseMessage('updatedTheme', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async manage(manageTheme: ManageThemeType, language: string): Promise<ResponseApi> {
        try {
            const themeCount = await this.themeRepository.existThemeByCode(manageTheme.code);

            if (themeCount == 0) {
                return this.customResponse.responseMessage('themeNotFound', language, HttpStatus.NOT_FOUND);
            };
            await this.themeRepository.manage(manageTheme);

            return this.customResponse.responseMessage('updatedTheme', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async allThemes(language: string): Promise<ResponseApi> {
        try {
            const result = await this.themeRepository.allThemes();
            return this.customResponse.responseBody(result, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
