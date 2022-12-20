import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { eventosEntity } from './entities/evento.entity';

@Controller('eventos')
@ApiTags('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) { }

  @Post()
  @ApiCreatedResponse({ type: eventosEntity })
  async create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  @ApiOkResponse({ type: eventosEntity })
  async findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: eventosEntity })
  async findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: eventosEntity })
  async update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: eventosEntity })
  async remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
