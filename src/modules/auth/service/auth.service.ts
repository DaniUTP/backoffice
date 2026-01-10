import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IAuthService } from '../interface/service/auth.service.interface';
import { ResponseApi } from 'src/shared/response/responseApi';
import { LoginType } from '../type/login/login.type';
import { CustomResponse } from 'src/shared/response/customResponse';
import { PasswordUtil } from 'src/shared/utils/password.util';
import { TokenUtil } from 'src/shared/utils/token.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from './crypto.service';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly tokenUtil: TokenUtil;
    private readonly customResponse = new CustomResponse();
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly cryptoService: CryptoService,
    ) {
        this.tokenUtil = new TokenUtil(this.jwtService, this.configService, this.cryptoService);
    }

    async login(client: LoginType, language: string): Promise<ResponseApi> {
        try {
            const user = await this.authRepository.findByEmail(client.email, ["id_admin_user", "password", "status"]);
            const errors: Record<string, string> = {};
            let hasErrors = false;

            if (!user) {
                errors.email = this.customResponse.message('notFound', language);
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            }

            if (user.status == 0) {
                errors.email = this.customResponse.message('notActive', language);
                hasErrors = true;
            }

            const isValidPassword = await PasswordUtil.comparePassword(client.password, user.password);
            if (!isValidPassword) {
                errors.password = this.customResponse.message('incorrectPassword', language);
                hasErrors = true;
            }

            if (hasErrors) {
                return this.customResponse.responseBody(
                    { errors },
                    HttpStatus.BAD_REQUEST
                );
            }

            const payload = {
                id: user.id_admin_user
            };
            const token = this.tokenUtil.createToken(payload);
            const personalAccessToken = await this.authRepository.createToken(user.id_admin_user, token);

            return this.customResponse.responseBody(
                { access_token: personalAccessToken.id + '|' + token },
                HttpStatus.OK
            );

        } catch (error) {
            this.logger.error(error.message);
            return this.customResponse.responseMessage(
                'internalServerError',
                language,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    };
}
