import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from "@nestjs/jwt";
import { LoginUsuarioDto } from "src/usuarios/dto/login-user.dto";
import { JwtPayload } from "./strategies/jwt.strategy";
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { usuariosEntity } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
  ) { }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usuariosService.findByPayload(payload);
    if (!user) {
      throw new HttpException("INVALID_TOKEN",
        HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }): any {
    const user: JwtPayload = { email };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async login(loginUsuarioDto: LoginUsuarioDto): Promise<any> {
    // find user in db
    const user = await
      this.usuariosService.findByLogin(loginUsuarioDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user
    };
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: usuariosEntity;
}

export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: usuariosEntity[];
}
