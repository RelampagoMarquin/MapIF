import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';

@Injectable()
export class PoligonosService {
  constructor (private prisma: PrismaService){}

  async create(createPoligonoDto: CreatePoligonoDto) {
    return this.prisma.poligonos.create({data: createPoligonoDto});
  }

  async findAll() {
    return this.prisma.poligonos.findMany();
  }

  async findOne(id: number) {
    return this.prisma.poligonos.findUnique({where: {id}});
  }

  async update(id: number, updatePoligonoDto: UpdatePoligonoDto) {
    return this.prisma.poligonos.update({
      where: {id},
      data: updatePoligonoDto
    });
  }

  async remove(id: number) {
    return this.prisma.poligonos.delete({where: {id}});
  }
}
