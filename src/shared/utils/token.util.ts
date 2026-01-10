import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { CryptoService } from "src/modules/auth/service/crypto.service";

export class TokenUtil {
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly cryptoService: CryptoService) { }
    public isTokenExpired(token: string): boolean {
        try {
            this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_SECRET"),
            });
            return false;
        } catch (error) {
            console.log(error.message)
            if (error.name === 'TokenExpiredError') {
                return true;
            }
            throw new UnauthorizedException('Token inválido');
        }
    };
    public createToken(payload: object): string {
        const expiresIn = this.configService.get<string>("JWT_EXPIRES_IN", '5h');
        const jwtPayload: Record<string, any> = {
            payload: this.cryptoService.encrypt(JSON.stringify(payload)),
        };
        const options: JwtSignOptions = {
            expiresIn: Number.parseInt(expiresIn),
            secret: this.configService.get<string>("JWT_SECRET"),
        };

        return this.jwtService.sign(jwtPayload, options);
    }
    public decodeToken(token: string): string {
        const decoded = this.jwtService.decode(token);
        return this.cryptoService.decrypt(decoded.payload);
    }
}