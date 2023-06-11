import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoligonosService } from './poligonos.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { poligonosEntity } from './entities/poligono.entity';
import { Public } from '../auth/auth.decoretor';

@Controller('poligonos')
@ApiTags('poligonos')
@ApiBearerAuth('JWT-auth')
export class PoligonosController {
  constructor(private readonly poligonosService: PoligonosService) { }

  @Post('/evento/:ideventos')
  @ApiCreatedResponse({ type: poligonosEntity })
  async create(@Param('ideventos') id: number, @Body() locais: any) {
    let createPoligonoDto = new CreatePoligonoDto()
    createPoligonoDto.locais = locais
    createPoligonoDto.eventoId = Number(id)
    return this.poligonosService.create(createPoligonoDto);
  }

  @Get('/evento/:ideventos')
  @ApiOkResponse({ type: poligonosEntity, isArray: true })
  async findAll(@Param('ideventos') ideventos: number) {
    return this.poligonosService.findByEvento(ideventos);
  }

  @Get(':id')
  @ApiOkResponse({ type: poligonosEntity })
  async findOne(@Param('id') id: string) {
    return this.poligonosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: poligonosEntity })
  async update(@Param('id') id: string, @Body() updatePoligonoDto: UpdatePoligonoDto) {
    return this.poligonosService.update(+id, updatePoligonoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: poligonosEntity })
  async remove(@Param('id') id: string) {
    return this.poligonosService.remove(+id);
  }

  @Public()
  @Get('/evento/:ideventos/public')
  @ApiOkResponse({type: poligonosEntity, isArray: true})
  async findAllPublic(@Param('ideventos') idEventos: string) {
    return this.poligonosService.findPublicByEventos(+idEventos);
  }

  @Public()
  @Get('/:id/public')
  @ApiOkResponse({type: poligonosEntity, isArray: true})
  async findByIdPublic(@Param('id') id: number) {
    return this.poligonosService.findPublicAtividade(+id);
  }
}
