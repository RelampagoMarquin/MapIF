import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Injectable()
export class GruposService {
  constructor(private prisma: PrismaService) {}

  create(createGrupoDto: CreateGrupoDto) {
    return this.prisma.grupos.create({data: createGrupoDto});
  }

  findAll() {
    return this.prisma.grupos.findMany();
  }

  findOne(id: number) {
    return this.prisma.grupos.findUnique({where: {id}});
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return this.prisma.grupos.update({
      where: {id},
      data: updateGrupoDto,
    });
  }

  remove(id: number) {
    return this.prisma.grupos.delete({where: {id}});
  }
}
