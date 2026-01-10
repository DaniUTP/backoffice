import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ResponseApi } from 'src/shared/response/responseApi';
import { CustomResponse } from 'src/shared/response/customResponse';
import { CreateClientType } from '../types/create/createClient.type';
import { UpdateClientType } from '../types/update/updateClient.type';
import { ChangeStatusType } from '../types/changeStatus/changeStatus.type';
import { CryptoService } from 'src/modules/auth/service/crypto.service';
import { TokenUtil } from 'src/shared/utils/token.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IClientService } from '../interface/service/client.service.interface';
import { ClientRepository } from '../repository/client.repository';

@Injectable()
export class ClientService implements IClientService {
    private readonly logger = new Logger(ClientService.name);
    private readonly customResponse: CustomResponse;
    private readonly tokenUtil: TokenUtil;
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.customResponse = new CustomResponse();
        this.tokenUtil = new TokenUtil(this.jwtService, this.configService, this.cryptoService);
    }

    async index(language: string, page: number, limit: number): Promise<ResponseApi> {
        try {
            const body = await this.clientRepository.index(page, limit);
            return this.customResponse.responseBody(body, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async store(client: CreateClientType, language: string): Promise<ResponseApi> {
        try {
            const clientData = await this.clientRepository.existUser(client.email);
            const errors = { user: "" };
            let hasErrors = false;

            if (clientData > 0) {
                errors.user = this.customResponse.message('userExist', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.clientRepository.store(client);
            return this.customResponse.responseMessage('register', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async show(id: number, language: string): Promise<ResponseApi> {
        try {
            const clientData = await this.clientRepository.show(id, [
                "name",
                "last_name",
                "email",
                "university",
                "phone"
            ]);
            if (!clientData) {
                return this.customResponse.responseMessage('notFound', language, HttpStatus.NOT_FOUND);
            };
            return this.customResponse.responseBody(clientData, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async update(client: UpdateClientType, language: string): Promise<ResponseApi> {
        try {
            const clientData = await this.clientRepository.existUser(client.email);
            const errors = { user: "" };
            let hasErrors = false;

            if (clientData === 0) {
                errors.user = this.customResponse.message('notFound', language);
                hasErrors = true;
            };

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            };
            await this.clientRepository.update(client);
            return this.customResponse.responseMessage('profileUpdated', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async changeStatus(client: ChangeStatusType, language: string): Promise<ResponseApi> {
        try {
            const clientData = await this.clientRepository.existUser(client.email);
            if (clientData === 0) {
                return this.customResponse.responseMessage('notFound', language, HttpStatus.BAD_REQUEST);
            };
            await this.clientRepository.changeStatus(client);
            return this.customResponse.responseMessage('statusUpdated', language, HttpStatus.OK);
        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage('internalServerError', language, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
