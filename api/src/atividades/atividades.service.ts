import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';

@Injectable()
export class AtividadesService {
  constructor(private prisma: PrismaService) { }

  create(createAtividadeDto: CreateAtividadeDto) {
    return this.prisma.atividade.create({ data: createAtividadeDto });
  }

  findAll() {
    return this.prisma.atividade.findMany();
  }

  findOne(id: number) {
    return this.prisma.atividade.findUnique({ where: { id } });
  }

  update(id: number, updateAtividadeDto: UpdateAtividadeDto) {
    return this.prisma.atividade.update({
      where: { id },
      data: updateAtividadeDto
    });
  }

  remove(id: number) {
    return this.prisma.atividade.delete({ where: { id } });
  }
}
