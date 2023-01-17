import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';

@Injectable()
export class PoligonosService {
  constructor (private prisma: PrismaService){}

  async create(createPoligonoDto: CreatePoligonoDto) {
    let {locais, eventoId} = createPoligonoDto
    locais = JSON.parse(locais)
    console.log(locais)
    return this.prisma.poligonos.create({data: {
      eventoId: eventoId,
      locais: locais 
    }});
  }

  async findAll() {
    return this.prisma.poligonos.findMany(
      {include: {
        atividade:{

        }}
      }
    );
  }

  async findOne(id: number) {
    return this.prisma.poligonos.findUnique({where: {id}});
  }

  async update(id: number, updatePoligonoDto: UpdatePoligonoDto) {
    /* return this.prisma.poligonos.update({
      where: {id},
      data: updatePoligonoDto
    }); */
  }

  async remove(id: number) {
    return this.prisma.poligonos.delete({where: {id}});
  }
}
