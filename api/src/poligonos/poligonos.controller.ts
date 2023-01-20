import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoligonosService } from './poligonos.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { poligonosEntity } from './entities/poligono.entity';
import { Public } from 'src/auth/auth.decoretor';

@Controller('poligonos')
@ApiTags('poligonos')
@ApiBearerAuth('JWT-auth')
export class PoligonosController {
  constructor(private readonly poligonosService: PoligonosService) {}

  @Post('/evento/:ideventos')
  @ApiCreatedResponse({type: poligonosEntity})
  async create(@Param('ideventos') id: number, @Body() locais: any,  createPoligonoDto: CreatePoligonoDto) {
    locais.toStr
    createPoligonoDto.eventoId = Number(id)
    return this.poligonosService.create(createPoligonoDto);
  }

  @Public()
  @Get('/evento/:ideventos')
  @ApiOkResponse({type: poligonosEntity, isArray: true})
  async findAll(@Param('ideventos') ideventos: number) {
    return this.poligonosService.findByEvento(ideventos);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({type: poligonosEntity})
  async findOne(@Param('id') id: string) {
    return this.poligonosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: poligonosEntity})
  async update(@Param('id') id: string, @Body() updatePoligonoDto: UpdatePoligonoDto) {
    return this.poligonosService.update(+id, updatePoligonoDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: poligonosEntity})
  async remove(@Param('id') id: string) {
    return this.poligonosService.remove(+id);
  }
}
