import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { CreateLocaiDto } from './dto/create-locai.dto';
import { UpdateLocaiDto } from './dto/update-locai.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocaisEntity } from './entities/locai.entity';
import { Public } from 'src/auth/auth.decoretor';

@Controller('locais')
@ApiTags('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post()
  @ApiCreatedResponse({type: LocaisEntity})
  async create(@Body() createLocaiDto: CreateLocaiDto) {
    return this.locaisService.create(createLocaiDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({type: LocaisEntity, isArray: true})
  async findAll() {
    return this.locaisService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({type: LocaisEntity})
  async findOne(@Param('id') id: string) {
    return this.locaisService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: LocaisEntity})
  async update(@Param('id') id: string, @Body() updateLocaiDto: UpdateLocaiDto) {
    return this.locaisService.update(+id, updateLocaiDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: LocaisEntity})
  async remove(@Param('id') id: string) {
    return this.locaisService.remove(+id);
  }
}
