import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AtividadesService } from './atividades.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { atividadesEntity } from './entities/atividade.entity';

@Controller('atividades')
@ApiTags('atividades')
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @Post()
  @ApiCreatedResponse({type: atividadesEntity})
  create(@Body() createAtividadeDto: CreateAtividadeDto) {
    return this.atividadesService.create(createAtividadeDto);
  }

  @Get()
  @ApiOkResponse({type: atividadesEntity, isArray: true})
  findAll() {
    return this.atividadesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: atividadesEntity})
  findOne(@Param('id') id: string) {
    return this.atividadesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: atividadesEntity})
  update(@Param('id') id: string, @Body() updateAtividadeDto: UpdateAtividadeDto) {
    return this.atividadesService.update(+id, updateAtividadeDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: atividadesEntity})
  remove(@Param('id') id: string) {
    return this.atividadesService.remove(+id);
  }
}
