import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';

@Injectable()
export class PoligonosService {
  constructor(private prisma: PrismaService) { }

  async create(createPoligonoDto: CreatePoligonoDto) {
    let { locais, eventoId } = createPoligonoDto
    let locaisKeys = Object.keys(locais)
    let string = '[' + locaisKeys[0] + ']'
    locais = JSON.parse(string)
    return this.prisma.poligonos.create({
      data: {
        eventoId: eventoId,
        locais: locais
      }
    });
  }

  async findByEvento(ideventos: number) {
    ideventos = Number(ideventos)
    return this.prisma.poligonos.findMany(
      {
        where: {
          eventoId: ideventos
        }
      }
    );
  }

  async findOne(id: number) {
    return this.prisma.poligonos.findUnique({ where: { id } });
  }

  async update(id: number, updatePoligonoDto: UpdatePoligonoDto) {
    /* return this.prisma.poligonos.update({
      where: {id},
      data: updatePoligonoDto
    }); */
  }

  async remove(id: number) {
    return this.prisma.poligonos.delete({ where: { id } });
  }
}
