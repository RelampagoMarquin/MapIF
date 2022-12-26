import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginUsuarioDto } from "src/usuarios/dto/login-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from './auth.decoretor';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('login')
    public async login(@Body() loginUsuarioDto: LoginUsuarioDto):
        Promise<any> {
        return await this.authService.login(loginUsuarioDto);
    }

}