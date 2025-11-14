import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from 'passport-jwt'

interface Payload {
    usuario: string;
    sub: string;
    email: string;
    iat: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'capivara'
        })
    }

    async validate(payload: Payload) {
        return {
            userId: payload.sub,
            usuario: payload.usuario,
            email: payload.email
        }
    }
}