import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { CreateLocaiDto } from './dto/create-locai.dto';
import { UpdateLocaiDto } from './dto/update-locai.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocaisEntity } from './entities/locai.entity';

@Controller('locais')
@ApiTags('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post()
  @ApiCreatedResponse({type: LocaisEntity})
  create(@Body() createLocaiDto: CreateLocaiDto) {
    return this.locaisService.create(createLocaiDto);
  }

  @Get()
  @ApiOkResponse({type: LocaisEntity, isArray: true})
  findAll() {
    return this.locaisService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: LocaisEntity})
  findOne(@Param('id') id: string) {
    return this.locaisService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: LocaisEntity})
  update(@Param('id') id: string, @Body() updateLocaiDto: UpdateLocaiDto) {
    return this.locaisService.update(+id, updateLocaiDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: LocaisEntity})
  remove(@Param('id') id: string) {
    return this.locaisService.remove(+id);
  }
}
