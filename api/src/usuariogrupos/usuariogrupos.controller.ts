import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariogruposService } from './usuariogrupos.service';
import { CreateUsuariogrupoDto } from './dto/create-usuariogrupo.dto';
import { UpdateUsuariogrupoDto } from './dto/update-usuariogrupo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { usuariogrupoEntity } from './entities/usuariogrupo.entity';

@Controller('usuariogrupos')
@ApiTags('usuariogrupos')
export class UsuariogruposController {
  constructor(private readonly usuariogruposService: UsuariogruposService) {}

  @Post()
  @ApiCreatedResponse({type: usuariogrupoEntity})
  create(@Body() createUsuariogrupoDto: CreateUsuariogrupoDto) {
    return this.usuariogruposService.create(createUsuariogrupoDto);
  }

  @Get()
  @ApiOkResponse({type: usuariogrupoEntity, isArray: true})
  findAll() {
    return this.usuariogruposService.findAll();
  }

  @Get('/:usuarioId/:grupoId')
  @ApiOkResponse({type: usuariogrupoEntity})
  findOne(@Param('usuarioId' ) usuarioId: string, @Param('grupoId') grupoId: string ) {
    console.log(Param)
    return this.usuariogruposService.findOne(+usuarioId, +grupoId);
  }

  @Patch('/:usuarioId/:grupoId')
  @ApiOkResponse({type: usuariogrupoEntity})
  update(@Param('usuarioId' ) usuarioId: string, @Param('grupoId') grupoId: string, @Body() updateUsuariogrupoDto: UpdateUsuariogrupoDto) {
    return this.usuariogruposService.update(+usuarioId, +grupoId, updateUsuariogrupoDto);
  }

  @Delete('/:usuarioId/:grupoId')
  @ApiOkResponse({type: usuariogrupoEntity})
  remove(@Param('usuarioId' ) usuarioId: string, @Param('grupoId') grupoId: string ) {
    return this.usuariogruposService.remove(+usuarioId, +grupoId);
  }
}
