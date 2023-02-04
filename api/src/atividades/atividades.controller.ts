import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decoretor';
import { AtividadesService } from './atividades.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { atividadesEntity } from './entities/atividade.entity';

@Controller('atividades')
@ApiTags('atividades')
@ApiBearerAuth('JWT-auth')
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @Post('/poligono/:idpoligono')
  @ApiCreatedResponse({type: atividadesEntity})
  async create(@Param('idpoligono') id: number, @Body() createAtividadeDto: CreateAtividadeDto) {
    createAtividadeDto.poligonoId = id
    return this.atividadesService.create(createAtividadeDto);
  }

  @Get('/poligono/:idpoligono')
  @ApiOkResponse({type: atividadesEntity, isArray: true})
  async findAll(@Param('idpoligono') idpoligono: number) {
    return this.atividadesService.findByPoligono(idpoligono);
  }


  @Get('/evento/:idevento')
  @ApiOkResponse({type: atividadesEntity, isArray: true})
  async findAllByEvento(@Param('idevento') idevento: number){
    return this.atividadesService.findByEvento(idevento)
  }

  @Get(':id')
  @ApiOkResponse({type: atividadesEntity})
  async findOne(@Param('id') id: string) {
    return this.atividadesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: atividadesEntity})
  async update(@Param('id') id: string, @Body() updateAtividadeDto: UpdateAtividadeDto) {
    return this.atividadesService.update(+id, updateAtividadeDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: atividadesEntity})
  async remove(@Param('id') id: string) {
    return this.atividadesService.remove(+id);
  }
}
