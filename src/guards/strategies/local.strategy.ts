import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { LoginService } from "src/login/login.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private loginService: LoginService
    ){
        super({
            usernameField: 'email',
            passwordField: 'senha'
        })
    }

    async validate(email: string, senha: string): Promise<any> {
        const usuario = await this.loginService.login(email, senha);

        if(!usuario) {
            throw new UnauthorizedException()
        }

        return usuario
    }
}