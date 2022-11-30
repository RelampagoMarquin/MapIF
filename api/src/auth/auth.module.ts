import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { jwtConstants } from './constants';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';
//import { LocalStrategy } from './local.strategy';

@Module({
  imports:[PrismaModule, UsuariosModule, PassportModule,
    PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'usuarios',
    session: false,
  }),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: jwtConstants.expiresIn
    },
  }),],
  providers: [AuthService, UsuariosService, JwtStrategy, PrismaService, AuthService, //LocalStrategy
],
  exports: [
    PassportModule,
    JwtModule,
    AuthService
  ],
})
export class AuthModule {}
