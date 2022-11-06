import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) { }

  create(createEventoDto: CreateEventoDto) {
    return this.prisma.eventos.create({ data: createEventoDto });
  }

  findAll() {
    return this.prisma.eventos.findMany();
  }

  findOne(id: number) {
    return this.prisma.eventos.findUnique({ where: { id } })
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return this.prisma.eventos.update({
      where: { id },
      data: updateEventoDto,
    });
  }

  remove(id: number) {
    return this.prisma.eventos.delete({ where: { id } });
  }
}
