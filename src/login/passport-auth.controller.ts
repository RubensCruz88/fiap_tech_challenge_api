import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { PassportLocalGuard } from "src/guards/passport-local.guard";
import { LocalStrategy } from "src/guards/strategies/local.strategy";
import { PassportJwtGuard } from "src/guards/passport-jwt.guard";

@Controller('/login/v2')
export class PassportController {
    constructor(
        private localStrategy: LocalStrategy
    ) {}

    @Post()
    @UseGuards(PassportLocalGuard)
    async login(@Body() loginDto: LoginDto) {
        const {email, senha} = loginDto

        return this.localStrategy.validate(email, senha)
    }

    @Get('me')
    @UseGuards(PassportJwtGuard)
    async getUserInfo(@Request() request) {
        return request.user
    }
}