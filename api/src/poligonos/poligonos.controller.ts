import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoligonosService } from './poligonos.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { poligonosEntity } from './entities/poligono.entity';
import { Public } from 'src/auth/auth.decoretor';

@Controller('poligonos')
@ApiTags('poligonos')
export class PoligonosController {
  constructor(private readonly poligonosService: PoligonosService) {}

  @Post('/evento/:ideventos')
  @ApiCreatedResponse({type: poligonosEntity})
  async create(@Param('ideventos') id: number, @Body() createPoligonoDto: CreatePoligonoDto) {
    createPoligonoDto.eventoId = id
    return this.poligonosService.create(createPoligonoDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({type: poligonosEntity, isArray: true})
  async findAll() {
    return this.poligonosService.findAll();
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
