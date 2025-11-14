import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { PassportController } from './passport-auth.controller';
import { LocalStrategy } from 'src/guards/strategies/local.strategy';
import { JwtStrategy } from 'src/guards/strategies/jwt.strategy';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioEntity])],
	controllers: [LoginController, PassportController],
	providers: [LoginService, JwtService, UsuarioService, LocalStrategy, JwtStrategy]
})
export class LoginModule {}
