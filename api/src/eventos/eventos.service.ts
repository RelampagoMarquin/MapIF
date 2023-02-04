import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) { }

  async create(createEventoDto: CreateEventoDto) {
    return this.prisma.eventos.create({ data: createEventoDto });
  }

  async findAll() {
    return this.prisma.eventos.findMany();
  }

  async findOne(id: number) {
    return this.prisma.eventos.findUnique({ where: { id } })
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    return this.prisma.eventos.update({
      where: { id },
      data: updateEventoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.eventos.delete({ where: { id } });
  }

  async publicEvents(){
    return this.prisma.eventos.findMany(
      {where: {
        isPublic: true,
        fim: {
          //lt and lte is way to compare variable, lt is low than e lte is low than or equal
          //gt and gte is way to compare variable, gt is greater than e lte is greater than or equal
          lte: Date.now().toString()
        }
      }}
    )
  }
}
