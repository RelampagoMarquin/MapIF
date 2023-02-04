import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GruposEntity } from './entities/grupo.entity';

@Controller('grupos')
@ApiTags('grupos')
@ApiBearerAuth('JWT-auth')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  @ApiCreatedResponse({ type: GruposEntity})
  async create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  @ApiOkResponse({type: GruposEntity, isArray: true})
  async findAll() {
    return this.gruposService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: GruposEntity})
  async findOne(@Param('id') id: string) {
    return this.gruposService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: GruposEntity})
  async update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateGrupoDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: GruposEntity})
  async remove(@Param('id') id: string) {
    return this.gruposService.remove(+id);
  }
}
