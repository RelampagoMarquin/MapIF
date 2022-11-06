import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoligonoDto } from './dto/create-poligono.dto';
import { UpdatePoligonoDto } from './dto/update-poligono.dto';

@Injectable()
export class PoligonosService {
  constructor (private prisma: PrismaService){}

  create(createPoligonoDto: CreatePoligonoDto) {
    return this.prisma.poligonos.create({data: createPoligonoDto});
  }

  findAll() {
    return this.prisma.poligonos.findMany();
  }

  findOne(id: number) {
    return this.prisma.poligonos.findUnique({where: {id}});
  }

  update(id: number, updatePoligonoDto: UpdatePoligonoDto) {
    return this.prisma.poligonos.update({
      where: {id},
      data: updatePoligonoDto
    });
  }

  remove(id: number) {
    return this.prisma.poligonos.delete({where: {id}});
  }
}
