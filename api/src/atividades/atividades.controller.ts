import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decoretor';
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
  async create(@Body() createAtividadeDto: CreateAtividadeDto) {
    return this.atividadesService.create(createAtividadeDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({type: atividadesEntity, isArray: true})
  async findAll() {
    return this.atividadesService.findAll();
  }

  @Public()
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
