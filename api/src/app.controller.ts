import { Controller, Request, Post, Body, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginUsuarioDto } from './usuarios/dto/login-user.dto';
import { Public } from './auth/auth.decoretor';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async me(@Request() req) {
    console.log(req.user)
    return this.authService.validateUser(req.user);
  }

  @Public()
  @Post('login')
    public async logon(@Body() LoginUsuarioDto: LoginUsuarioDto):
        Promise<any> {
        return await this.authService.login(LoginUsuarioDto);
    }
}
