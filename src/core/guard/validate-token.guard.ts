import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ClientRepository } from 'src/modules/client/repository/client.repository';
import { CustomResponse } from 'src/shared/response/customResponse';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
    private readonly customResponse = new CustomResponse();

    private readonly publicRoutes = [
        'login'
    ];

    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const language = request.query.lang;

        if (this.isPublicRoute(request.url)) {
            return true;
        }

        if (!request.headers.authorization) {
            throw new UnauthorizedException(this.customResponse.translateMessages('noToken', language));
        };

        return this.validateToken(request.headers.authorization, language);
    };

    private isPublicRoute(url: string): boolean {
        return this.publicRoutes.some(route => url.includes(route));
    };

    private async validateToken(token: string, language: string) {
        if (!token.includes('|') || token.split('|').length !== 2) {
            throw new UnauthorizedException(this.customResponse.translateMessages('notStructureToken', language));
        }

        const tokenSplit = token.split('|');
        const personalTokenId = Number.parseInt(tokenSplit[0]);

        console.log("id_token: ", personalTokenId);

        if (Number.isNaN(personalTokenId) || personalTokenId <= 0) {
            throw new UnauthorizedException(this.customResponse.translateMessages('invalidToken', language));
        }

        try {
            const foundToken = await this.clientRepository.existToken(personalTokenId);
            console.log("token count: ", foundToken);

            if (foundToken === 0) {
                throw new UnauthorizedException(this.customResponse.translateMessages('invalidToken', language));
            }

            this.jwtService.verify(tokenSplit[1], {
                secret: this.configService.get<string>("JWT_SECRET"),
            });
            return true;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }

            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException(this.customResponse.translateMessages('expiredToken', language));
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException(this.customResponse.translateMessages('invalidToken', language));
            }

            console.error('Unexpected error during token validation:', error);
            throw new UnauthorizedException(this.customResponse.translateMessages('invalidToken', language));
        }
    }
}