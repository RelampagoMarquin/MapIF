import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';

@Injectable()
export class AtividadesService {
  constructor(private prisma: PrismaService) { }

  async create(createAtividadeDto: CreateAtividadeDto) {
    return this.prisma.atividade.create({ data: createAtividadeDto });
  }

  async findByPoligono(idpoligono: number) {
    idpoligono = Number(idpoligono)
    return this.prisma.atividade.findMany({
      where: {
        poligonoId: idpoligono
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.atividade.findUnique({ where: { id } });
  }

  async update(id: number, updateAtividadeDto: UpdateAtividadeDto) {
    return this.prisma.atividade.update({
      where: { id },
      data: updateAtividadeDto
    });
  }

  async remove(id: number) {
    return this.prisma.atividade.delete({ where: { id } });
  }
}
