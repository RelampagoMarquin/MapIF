import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GruposEntity } from './entities/grupo.entity';

@Controller('grupos')
@ApiTags('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  @ApiCreatedResponse({ type: GruposEntity})
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  @ApiOkResponse({type: GruposEntity, isArray: true})
  findAll() {
    return this.gruposService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: GruposEntity})
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: GruposEntity})
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateGrupoDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: GruposEntity})
  remove(@Param('id') id: string) {
    return this.gruposService.remove(+id);
  }
}
