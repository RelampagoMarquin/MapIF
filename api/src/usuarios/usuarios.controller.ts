import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { usuariosEntity } from './entities/usuario.entity';
import { Public } from 'src/auth/auth.decoretor';

@Controller('usuarios')
@ApiTags('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Public()
  @ApiCreatedResponse({ type: usuariosEntity})
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const saltOrRounds = await bcrypt.genSalt()
    const password = await bcrypt.hash(createUsuarioDto.senha, saltOrRounds)
    createUsuarioDto.senha = password
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOkResponse({ type: usuariosEntity, isArray: true})
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: usuariosEntity})
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: usuariosEntity})
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: usuariosEntity})
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
